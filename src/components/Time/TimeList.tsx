import React, { useState, useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';

import {
    switchTimeOptVisibleStatus,
    setVisibleForAllTimeOpt
} from '../../app/slices/mainSlice';

import { Itime } from '../../types/cardTypes';

import TimeTemplate from './TimeTemplate';

import './time.scss';

// /. imports

interface propsTypes {
    timesData: Itime[];
    role?: string;
    service_id: number;
    onTimeOptionClick: (arg1: number, arg2: number) => void;
}

// /. interfaces

const TimeList: React.FC<propsTypes> = props => {
    const { timesData, role, service_id, onTimeOptionClick } = props;

    const [isButtonVisible, setButtonVisibleStatus] = useState<boolean>(false);
    const [isButtonClicked, setButtonClickedStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(switchTimeOptVisibleStatus({ service_id }));
    }, [service_id]);

    useEffect(() => {
        timesData.length >= 3
            ? setButtonVisibleStatus(true)
            : setButtonVisibleStatus(false);
    }, [timesData]);

    const onTimesButtonClickShow = (): void => {
        setButtonClickedStatus(true);
        dispatch(setVisibleForAllTimeOpt({ service_id }));
    };

    const onTimesButtonClickHide = (): void => {
        setButtonClickedStatus(false);
        dispatch(switchTimeOptVisibleStatus({ service_id }));
    };

    return (
        <div className={role ? `${role} flight-time` : 'flight-time'}>
            <div className="flight-time__wrapper">
                {timesData.map((time: Itime) => {
                    return (
                        <TimeTemplate
                            key={time.id}
                            {...time}
                            onTimeOptionClick={onTimeOptionClick}
                            service_id={service_id}
                        />
                    );
                })}
                <>
                    {isButtonVisible && (
                        <>
                            {!isButtonClicked ? (
                                <button
                                    className="flight-time__button"
                                    onClick={onTimesButtonClickShow}
                                >
                                    ещё...
                                </button>
                            ) : (
                                <button
                                    className="flight-time__button flight-time__button--hide"
                                    onClick={onTimesButtonClickHide}
                                >
                                    скрыть...
                                </button>
                            )}
                        </>
                    )}
                </>
            </div>
        </div>
    );
};

export default TimeList;
