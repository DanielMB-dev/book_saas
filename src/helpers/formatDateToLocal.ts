export function convertToLocalTime( datetime: string , timezone: string) {
    // Crear un objeto Date usando la fecha y la zona horaria proporcionada
    const date = new Date(datetime);
    console.log(datetime)
    // Obtener la zona horaria del usuario
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convertir la fecha a la zona horaria local del usuario
    const localDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));

    return localDate;
}

