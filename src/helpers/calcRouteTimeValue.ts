import { addDeficientDigit } from './addDeficientDigit';

// /. imports

interface propTypes {
    startTimeValue: string
    travelTimeValue?: number
}

export function calcRouteTimeValue(props: propTypes): string {
    const { startTimeValue, travelTimeValue = 0 } = props;

    const [hours, minutes] = startTimeValue.replace(/[^0-9:]/g, '').split(':'); // ['21', '55']

    const totalMinutes = (+hours * 60) + +minutes + +travelTimeValue;
    const totalConvertedMinutes = totalMinutes % 60;
    let totalHours = Math.floor(totalMinutes / 60);

    if (totalHours >= 24) {
        // for correct work with 24-hours time format
        totalHours = 0;
    }

    const endTimeValue = `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}`;

    return endTimeValue;
}