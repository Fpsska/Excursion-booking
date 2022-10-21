import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';

import TimetableForm from '../TimetableForm/TimetableForm';

import { fetchRoutesData } from '../../app/api/fetchRoutesData';

import { addDeficientDigit } from '../../helpers/addDeficientDigit';
import { declinateByNum } from '../../helpers/declinateByNum';

// /.imports

const JsTaskPage: React.FC = () => {
    const [routeNameValue, setRouteNameValue] = useState<string>('из A в B');

    const [startTimeValue, setStartTimeValue] = useState<string>('00:00');
    const [endTimeValue, setEndTimeValue] = useState<string>('00:00');
    const [travelTimeValue, setTravelTimeValue] = useState<number>(50); // one way time = 50 min

    const [ticketsTextValue, setTicketsTextValue] = useState<string>('билет');
    const [ticketsCountValue, setTicketsCountValue] = useState<number>(0);
    const [ticketsPriceValue, setTicketsPriceValue] = useState<number>(0);

    const [isDataCalculated, setDataCalculatedStatus] =
        useState<boolean>(false);

    const [timeZone, setTimeZone] = useState<string>('');
    const [timeZoneOffset, setTimeZoneOffset] = useState<number>(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // get routesData[],timesData[] from API
        dispatch(fetchRoutesData());

        // set initial startTimeValue
        setStartTimeValue('18:00');

        // set user's timezone information
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimeZone(timezone);

        const timeZoneOffset = new Date().getTimezoneOffset();
        setTimeZoneOffset(timeZoneOffset);
    }, []);

    useEffect(() => {
        // update endTimeValue
        const [hours, minutes] = startTimeValue.split(':');

        const totalMinutes = +hours * 60 + +minutes + +travelTimeValue;
        const totalConvertedMinutes = totalMinutes % 60;
        let totalHours = Math.floor(totalMinutes / 60);

        if (totalHours >= 24) {
            // for correct work with 24-hours time format
            totalHours = 0;
        }

        setEndTimeValue(
            `${addDeficientDigit(totalHours)}:${addDeficientDigit(
                totalConvertedMinutes
            )}`
        );
    }, [startTimeValue, travelTimeValue]);

    useEffect(() => {
        // update travelTimeValue, ticketsPriceValue
        switch (routeNameValue) {
            case 'из A в B и обратно в А':
                setTravelTimeValue(100);
                setTicketsPriceValue(ticketsCountValue * 1200);
                break;
            default: // "из A в B" и "из B в A"
                setTravelTimeValue(50);
                setTicketsPriceValue(ticketsCountValue * 700);
        }
        // update ticketsTextValue
        setTicketsTextValue(
            declinateByNum(ticketsCountValue, ['билет', 'билета', 'билетов'])
        );
    }, [routeNameValue, ticketsCountValue]);

    return (
        <div className="timetable">
            <div className="timetable__wrapper">
                <ul className="timetable__zone zone">
                    <li className="zone__information">
                        Your timezone: <b>{timeZone}</b>
                    </li>
                    <li className="zone__information">
                        Your timezone offset:
                        <b>{timeZoneOffset} min.</b>
                        {''} / {''}
                        <b>{timeZoneOffset / 60} hrs.</b>
                    </li>
                </ul>
                <TimetableForm
                    routeNameValue={routeNameValue}
                    startTimeValue={startTimeValue}
                    ticketsCountValue={ticketsCountValue}
                    isDataCalculated={isDataCalculated}
                    setRouteNameValue={setRouteNameValue}
                    setStartTimeValue={setStartTimeValue}
                    setDataCalculatedStatus={setDataCalculatedStatus}
                    setTicketsCountValue={setTicketsCountValue}
                />
                <>
                    {isDataCalculated && (
                        <div className="timetable__output">
                            <p className="timetable__output-text">
                                Вы выбрали <strong>{ticketsCountValue}</strong>{' '}
                                {ticketsTextValue} по маршруту{' '}
                                <strong>{routeNameValue}</strong> стоимостью{' '}
                                <strong>{ticketsPriceValue} р</strong>.
                            </p>
                            <p className="timetable__output-text">
                                {' '}
                                Это путешествие займет у вас{' '}
                                <strong>{travelTimeValue} минут</strong>.
                            </p>
                            <p className="timetable__output-text">
                                {' '}
                                Теплоход отправляется в{' '}
                                <strong>{startTimeValue}</strong>, а прибудет в{' '}
                                <strong>{endTimeValue}</strong>.
                            </p>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default JsTaskPage;
