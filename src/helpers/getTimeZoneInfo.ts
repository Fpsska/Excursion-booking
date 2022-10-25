interface outputTypes {
    timeZoneName: string
    timeZoneOffset: number
}

// /. interfaces

export function getTimeZoneInfo(): outputTypes {

    // set user's timezone information
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = new Date().getTimezoneOffset();


    return { timeZoneName, timeZoneOffset };
}