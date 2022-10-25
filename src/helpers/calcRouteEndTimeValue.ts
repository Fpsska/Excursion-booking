import { addDeficientDigit } from './addDeficientDigit';

// /. imports

export function calcRouteEndTimeValue(startTimeValue: string, travelTimeValue: number): string {
    const [hours, minutes] = startTimeValue.split(':'); // ['21', '55']

    const totalMinutes = +hours * 60 + +minutes + +travelTimeValue;
    const totalConvertedMinutes = totalMinutes % 60;
    let totalHours = Math.floor(totalMinutes / 60);

    if (totalHours >= 24) {
        // for correct work with 24-hours time format
        totalHours = 0;
    }

    const endTimeValue = `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}`;

    return endTimeValue;
}