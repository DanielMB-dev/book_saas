"use server";

import { BookingDataDB } from "@/types/booking";
import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0
import { Buffer } from "buffer";


export async function sendEmailMessage(emailData: BookingDataDB, eventContent: string) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
  });
  try {

    const attachment = {
      filename: "booking.ics",
      contentType: "text/calendar",
      data: Buffer.from(eventContent, "utf-8"),
    };
    const data = await mg.messages.create("devsintown.com", {
      from: "Booking Team <contacto@devsintown.com>",
      to: [emailData.guestEmail],
      subject: `Nueva Rserva de ${emailData.guestEmail}`,
      text: `Congratulations, ${emailData.guestName}, has made a new booking
      Date: ${emailData.startTime} - ${emailData.endTime}
      Notes: ${emailData.notes}
      `,
      attachment: [attachment]
    });
    console.log("Email sent", data)
  } catch (error) {
    console.log(error); //logs any error
  }
}
