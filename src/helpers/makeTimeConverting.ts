import { addDeficientDigit } from './addDeficientDigit';

// /. imports

export function makeTimeConverting(array: any, travelTimeValue: number): any {

    // set user's timezone information
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = new Date().getTimezoneOffset();

    let updatedTimesData = [];
    let totalMinutes = 0;
    let totalConvertedMinutes = 0;
    let totalHours = 0;
    let routeName = '';

    updatedTimesData = [...array];

    updatedTimesData.map((item: any) => {
        const itemValue = item.value.replace(/[^0-9:]/g, '').split(':'); // ['21', '55'], ...

        routeName = item.value.replace(/[^а-яa-z()\s]/gi, ''); // (из A в B), ...

        totalMinutes = (+itemValue[0] * 60) + +itemValue[1] + travelTimeValue + timeZoneOffset;
        totalConvertedMinutes = totalMinutes % 60;
        totalHours = Math.floor(totalMinutes / 60);

        if (totalHours >= 24) {
            // for correct work with 24-hours time format
            totalHours = 0;
        }

        // return { ...item, value: `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}${'TEST'}` };
        item.value = `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}${'TEST'}`;
    });

    // for (let i = 0; i < updatedTimesData.length; i++) {
    //     const item = { ...updatedTimesData[i] }; // {id: 1, value: '21:55(из A в B)'}
    //     // console.log(item)

    //     const itemValue = item.value.replace(/[^0-9:]/g, '').split(':'); // ['21', '55'], ...
    //     // console.log(itemValue)

    //     routeName = item.value.replace(/[^а-яa-z()\s]/gi, ''); // (из A в B), ...

    //     totalMinutes = (+itemValue[0] * 60) + +itemValue[1];
    //     totalConvertedMinutes = totalMinutes % 60;
    //     totalHours = Math.floor(totalMinutes / 60);

    //     if (totalHours >= 24) {
    //         // for correct work with 24-hours time format
    //         totalHours = 0;
    //     }

    //     item.value = `${addDeficientDigit(totalHours)}:${addDeficientDigit(totalConvertedMinutes)}${'routeName'}`;
    // }


    return { updatedTimesData, timezoneName, timeZoneOffset };
}