import React, { useState, useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
    setConvertedTimesData,
    filterTimesData
} from '../../app/slices/formSlice';

import TimetableForm from '../TimetableForm/TimetableForm';

import { fetchRoutesData } from '../../app/api/fetchRoutesData';

import { declinateByNum } from '../../helpers/declinateByNum';
import { getTimeZoneInfo } from '../../helpers/getTimeZoneInfo';
import { getConvertedData } from '../../helpers/getConvertedData';
import { calcRouteTimeValue } from '../../helpers/calcRouteTimeValue';

// /.imports

const JsTaskPage: React.FC = () => {
    const [routeNameValue, setRouteNameValue] = useState<string>('');

    const [startTimeValue, setStartTimeValue] = useState<string>('');
    const [endTimeValue, setEndTimeValue] = useState<string>('');
    const [travelTimeValue, setTravelTimeValue] = useState<number>(50);

    const [ticketsTextValue, setTicketsTextValue] = useState<string>('билет');
    const [ticketsCountValue, setTicketsCountValue] = useState<number>(0);
    const [ticketsPriceValue, setTicketsPriceValue] = useState<number>(0);

    const [isDataCalculated, setDataCalculatedStatus] =
        useState<boolean>(false);

    const { timesData, convertedTimesData } = useAppSelector(
        state => state.formSlice
    );
    const dispatch = useAppDispatch();

    const { timeZoneName, timeZoneOffset } = getTimeZoneInfo();

    useEffect(() => {
        // get routesData[], timesData[] from API
        setTimeout(() => {
            dispatch(fetchRoutesData());
        }, 1000);
    }, []);

    useEffect(() => {
        // fill new (converted) times array
        dispatch(
            setConvertedTimesData(
                getConvertedData({
                    array: timesData,
                    timeZoneOffset
                })
            )
        );
    }, [timesData, timeZoneOffset]);

    useEffect(() => {
        // set initial routeNameValue
        if (!routeNameValue && isDataCalculated) {
            setRouteNameValue(
                convertedTimesData[0]?.value.replace(/[^а-яa-z\s]/gi, '')
            );
        }
    }, [routeNameValue, isDataCalculated, convertedTimesData]);

    useEffect(() => {
        // set initial startTimeValue
        if (!startTimeValue && isDataCalculated) {
            setStartTimeValue(
                convertedTimesData[0]?.value.replace(/[^0-9:]/g, '')
            );
        }
    }, [startTimeValue, isDataCalculated, convertedTimesData]);

    useEffect(() => {
        // update endTimeValue
        setEndTimeValue(
            calcRouteTimeValue({ startTimeValue, travelTimeValue })
        );
    }, [startTimeValue, travelTimeValue]);

    useEffect(() => {
        // update travelTimeValue, ticketsPriceValue
        switch (routeNameValue) {
            case 'из A в B и обратно в А':
                setTravelTimeValue(100);
                setTicketsPriceValue(ticketsCountValue * 1200);
                dispatch(filterTimesData({ filterProp: routeNameValue }));
                break;
            case 'из A в B':
                setTravelTimeValue(50);
                setTicketsPriceValue(ticketsCountValue * 700);
                dispatch(filterTimesData({ filterProp: routeNameValue }));
                break;
            case 'из B в A':
                setTravelTimeValue(50);
                setTicketsPriceValue(ticketsCountValue * 700);
                dispatch(filterTimesData({ filterProp: routeNameValue }));
                break;
            default:
                return;
        }
        // update ticketsTextValue
        setTicketsTextValue(
            declinateByNum(ticketsCountValue, ['билет', 'билета', 'билетов'])
        );
        // reject count of tickets less 0
        ticketsCountValue < 0 && setTicketsCountValue(0);
    }, [routeNameValue, ticketsCountValue]);

    const onDocKeyDownClick = useCallback((key: string): void => {
        switch (key) {
            case 'ArrowUp':
                setTicketsCountValue(prevCount => prevCount + 1);
                break;
            case 'ArrowDown':
                setTicketsCountValue(prevCount => prevCount - 1);
                break;
        }
    }, []);

    return (
        <div className="timetable">
            <div className="timetable__wrapper">
                <ul className="timetable__zone zone">
                    <li className="zone__information">
                        Your timezone: <b>{timeZoneName}</b>
                    </li>
                    <li className="zone__information">
                        Your timezone offset: {''}
                        <b>{timeZoneOffset} min.</b>
                        {''} / {''}
                        <b>{timeZoneOffset / 60} hrs.</b>
                    </li>
                </ul>
                <TimetableForm
                    ticketsCountValue={ticketsCountValue}
                    routeNameValue={routeNameValue}
                    isDataCalculated={isDataCalculated}
                    setRouteNameValue={setRouteNameValue}
                    setStartTimeValue={setStartTimeValue}
                    setDataCalculatedStatus={setDataCalculatedStatus}
                    setTicketsCountValue={setTicketsCountValue}
                    onDocKeyDownClick={onDocKeyDownClick}
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
