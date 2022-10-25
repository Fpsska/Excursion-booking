import { addDeficientDigit } from './addDeficientDigit';

// /. imports

interface propTypes {
    array: any[]
    timeZoneOffset: number
}

// /. interfaces

export function getConvertedData(props: propTypes): any[] {

    const { array, timeZoneOffset } = props;

    let totalMinutes = 0;
    let totalConvertedMinutes = 0;
    let totalHours = 0;
    let routeName = '';

    const convertedTimeArray = array.map((item: any) => {
        const itemValue = item.value.replace(/[^0-9:]/g, '').split(':'); // ['21', '55']

        routeName = item.value.replace(/[^а-яa-z()\s]/gi, '');
        totalMinutes = (+itemValue[0] * 60) + +itemValue[1] + timeZoneOffset;
        totalConvertedMinutes = totalMinutes % 60;
        totalHours = Math.floor(totalMinutes / 60);

        if (totalHours >= 24) {
            // for correct work with 24-hours time format
            totalHours = 0;
        }

        return { ...item, value: `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}${routeName}` };
    });

    return convertedTimeArray;
}