export const formatLocalDate = (dateUTC: Date) => {

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convertir a la zona horaria del usuario
    const localDate = new Date(
        new Date(dateUTC).toLocaleString("en-US", { timeZone: 'UTC-3' })
    );

    return localDate

}