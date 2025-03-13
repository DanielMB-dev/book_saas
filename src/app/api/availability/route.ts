import { NextResponse } from "next/server"
import { db } from "@/db"
import { availability } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getUserIdFromUsername } from "@/lib/auth"
import {
  addMinutes,
  format,
  parse,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns"
import { toZonedTime, fromZonedTime } from "date-fns-tz";

import { getCalendarEvents } from "@/lib/google"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")
  const year = searchParams.get("year")
  const month = searchParams.get("month") // 1-12
  const timeZone = searchParams.get("timeZone") || "UTC" // Default UTC si no se envía

  if (!username || !year || !month) {
    return NextResponse.json(
      { error: "Username, year, and month parameters are required" },
      { status: 400 }
    )
  }

  const userId = await getUserIdFromUsername(username)
  if (!userId) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    )
  }

  // Obtener disponibilidad
  const availabilityRecords = await db
    .select()
    .from(availability)
    .where(eq(availability.userId, userId))

  if (availabilityRecords.length === 0) {
    return NextResponse.json({
      year,
      month,
      days: [],
    })
  }

  // Mapear disponibilidad por día de la semana
  const availabilityByDay = availabilityRecords.reduce((acc, record) => {
    acc[record.dayOfWeek] = {
      startTime: record.startTime,
      endTime: record.endTime,
    }
    return acc
  }, {} as Record<string, { startTime: string; endTime: string }>)

  // Definir el rango del mes
  const monthDate = new Date(parseInt(year), parseInt(month) - 1)
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)

  // Obtener eventos de Google Calendar
  const events = await getCalendarEvents(userId, parseInt(year), parseInt(month))

  // Generar los días con disponibilidad
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(date => {
    const dayOfWeek = format(date, "EEEE")
    const dayAvailability = availabilityByDay[dayOfWeek]

    if (!dayAvailability) {
      return {
        date: format(date, "yyyy-MM-dd"),
        available: false,
        slots: [],
      }
    }

    // Generar slots en la zona horaria del usuario
    const slots = []
    let currentTime = parse(dayAvailability.startTime, "HH:mm", date)
    const endTimeDate = parse(dayAvailability.endTime, "HH:mm", date)

    while (currentTime <= endTimeDate) {
      const slotStartLocal = toZonedTime(currentTime, timeZone)
      const slotEndLocal = toZonedTime(addMinutes(currentTime, 30), timeZone)

      // Convertir a UTC para comparar con eventos de Google Calendar
      const slotStartUTC = fromZonedTime(slotStartLocal, timeZone)
      const slotEndUTC = fromZonedTime(slotEndLocal, timeZone)

      const isAvailable = !events.some(event => {
        const eventStart = new Date(event.start.dateTime)
        const eventEnd = new Date(event.end.dateTime)

        return (
          (eventStart >= slotStartUTC && eventStart < slotEndUTC) ||
          (eventEnd > slotStartUTC && eventEnd <= slotEndUTC) ||
          (eventStart <= slotStartUTC && eventEnd >= slotEndUTC)
        )
      })

      slots.push({
        time: format(slotStartLocal, "HH:mm"), // Mostrar en hora local
        available: isAvailable,
      })

      currentTime = addMinutes(currentTime, 30)
    }

    return {
      date: format(date, "yyyy-MM-dd"),
      available: slots.some(slot => slot.available),
      slots,
    }
  })

  return NextResponse.json({
    year,
    month,
    days,
  })
}
