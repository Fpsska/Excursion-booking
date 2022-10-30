import React, { useState, useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { filterTimesData } from '../../app/slices/formSlice';

import TimetableForm from '../TimetableForm/TimetableForm';

import { fetchRoutesData } from '../../app/api/fetchRoutesData';

import { declinateByNum } from '../../helpers/declinateByNum';
import { getTimeZoneInfo } from '../../helpers/getTimeZoneInfo';
import { calcRouteTimeValue } from '../../helpers/calcRouteTimeValue';

// /.imports

const JsTaskPage: React.FC = () => {
    const [routeNameValue, setRouteNameValue] = useState<string>('');
    const [fullTimeValue, setFullTimeValue] = useState<string>('');

    const [startTimeValue, setStartTimeValue] = useState<string>('');
    const [endTimeValue, setEndTimeValue] = useState<string>('');
    const [travelTimeValue, setTravelTimeValue] = useState<number>(50);

    const [ticketsTextValue, setTicketsTextValue] = useState<string>('билет');
    const [ticketsCountValue, setTicketsCountValue] = useState<number>(1);
    const [ticketsPriceValue, setTicketsPriceValue] = useState<number>(0);

    const [isDataCalculated, setDataCalculatedStatus] =
        useState<boolean>(false);
    const [isTimesDataEmpty, setTimesDataEmptyStatus] =
        useState<boolean>(false);

    // /. state

    const { timesData } = useAppSelector(state => state.formSlice);
    const dispatch = useAppDispatch();

    const { timeZoneName, timeZoneOffset } = getTimeZoneInfo();

    // /. hooks

    const onDocKeyDownClick = useCallback((key: string): void => {
        switch (key) {
            case 'ArrowUp':
                setTicketsCountValue(prevCount => prevCount + 1);
                break;
            case 'ArrowDown':
                setTicketsCountValue(prevCount => prevCount - 1);
                break;
            default:
                return;
        }
    }, []);

    const handleEventByRouteName = useCallback((): void => {
        switch (routeNameValue) {
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
            case 'из A в B и обратно в A':
                setTravelTimeValue(100);
                setTicketsPriceValue(ticketsCountValue * 1200);
                dispatch(filterTimesData({ filterProp: routeNameValue }));
                break;
            default:
                return;
        }
    }, [routeNameValue, ticketsCountValue]);

    // /. functions

    useEffect(() => {
        // get routesData[], timesData[] from API
        setTimeout(() => {
            dispatch(fetchRoutesData());
        }, 1000);
    }, []);

    // useEffect(() => {
    //     // fill new (converted) times array
    //     dispatch(
    //         setConvertedTimesData(
    //             getConvertedData({
    //                 array: timesData,
    //                 timeZoneOffset
    //             })
    //         )
    //     );
    // }, [timesData, timeZoneOffset]);

    useEffect(() => {
        // set startTimeValue when opt is not selected
        if (!startTimeValue && isDataCalculated) {
            setStartTimeValue(timesData[0]?.value.replace(/[^0-9:]/g, ''));
        }
    }, [startTimeValue, isDataCalculated, timesData]);

    useEffect(() => {
        // update endTimeValue
        if (isDataCalculated) {
            setEndTimeValue(
                calcRouteTimeValue({ startTimeValue, travelTimeValue })
            );
        }
    }, [startTimeValue, travelTimeValue, isDataCalculated]);

    useEffect(() => {
        // update travelTimeValue, ticketsPriceValue
        handleEventByRouteName();
    }, [handleEventByRouteName]);

    useEffect(() => {
        // update ticketsTextValue
        setTicketsTextValue(
            declinateByNum(ticketsCountValue, ['билет', 'билета', 'билетов'])
        );
        // reject count of tickets less 0
        ticketsCountValue < 0 && setTicketsCountValue(0);
    }, [ticketsCountValue]);

    useEffect(() => {
        // handle timesDataEmptyStatus flag
        // update startTimeValue when times opt is change of filtered timesData[]
        if (timesData.length === 0) {
            setTimesDataEmptyStatus(true);
        } else {
            setTimesDataEmptyStatus(false);
            setStartTimeValue(timesData[0]?.value.replace(/[^0-9:]/g, ''));
        }
    }, [timesData, routeNameValue]);

    useEffect(() => {
        // hide timetable__output markup when select's data is empty
        // set actual value for timetable-form__select after forced re-render timetable__output markup
        if (isTimesDataEmpty) {
            setDataCalculatedStatus(false);
            setFullTimeValue(timesData[0]?.value.replace(/[^0-9:]/g, ''));
        }
    }, [isTimesDataEmpty, timesData]);

    // /. effects

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
                    fullTimeValue={fullTimeValue}
                    isDataCalculated={isDataCalculated}
                    isTimesDataEmpty={isTimesDataEmpty}
                    setRouteNameValue={setRouteNameValue}
                    setFullTimeValue={setFullTimeValue}
                    setStartTimeValue={setStartTimeValue}
                    setEndTimeValue={setEndTimeValue}
                    setDataCalculatedStatus={setDataCalculatedStatus}
                    setTicketsCountValue={setTicketsCountValue}
                    onDocKeyDownClick={onDocKeyDownClick}
                />
                <>
                    {isDataCalculated && !isTimesDataEmpty && (
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
