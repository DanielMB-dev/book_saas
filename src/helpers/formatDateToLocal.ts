export function convertToLocalTime( datetime: Date , timezone: string) {
   
    const localDate = new Date(datetime.toLocaleString('en-US', { timeZone: timezone }));

    return localDate;
}

