import React, { useState, useEffect, useRef } from 'react';

import { useAppSelector } from '../../app/hooks';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import { useValidation } from '../../hooks/useValidation';

import TimetableFormOpt from './TimetableFormOpt';
import PlaceholderOption from './PlaceholderOption';

import './timeTable-form.scss';

// /. imports

interface propTypes {
    ticketsCountValue: number;
    routeNameValue: string;
    isDataCalculated: boolean;
    setRouteNameValue: (arg: string) => void;
    setStartTimeValue: (arg: string) => void;
    setDataCalculatedStatus: (arg: boolean) => void;
    setTicketsCountValue: (arg: number) => void;
    onDocKeyDownClick: (arg: any) => void;
}

// /. interfaces

const TimetableForm: React.FC<propTypes> = props => {
    const {
        routeNameValue,
        ticketsCountValue,
        isDataCalculated,
        setRouteNameValue,
        setStartTimeValue,
        setDataCalculatedStatus,
        setTicketsCountValue,
        onDocKeyDownClick
    } = props;

    // /. props

    const {
        routesData,
        routesDataErrorStatus,
        routesDataFetchStatus,
        convertedTimesData
    } = useAppSelector(state => state.formSlice);

    const [isTimesDataEmpty, setTimesDataEmptyStatus] =
        useState<boolean>(false);

    const ticketInput = useValidation(ticketsCountValue, {
        minLength: 1,
        maxLength: 10
    });

    const formRef = useRef<HTMLFormElement>(null!);

    // /. hooks

    const isFormValid =
        ticketsCountValue >= ticketInput.minLengthCount &&
        ticketsCountValue <= ticketInput.maxLengthCount;

    const isFormControlsActive =
        !routesDataErrorStatus && routesDataFetchStatus === 'success';

    const isInputHasError =
        ticketInput.isInputActive && !ticketInput.isInputValid;

    // variables

    const onButtonCalcClick = (): void => {
        setDataCalculatedStatus(true);
    };

    const onButtonResetClick = (): void => {
        formRef.current.reset();
        setTicketsCountValue(0);
        setDataCalculatedStatus(false);
    };

    const onInputTicketsChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const validEventValue = e.target.value.replace(/[^0-9]/g, '');
        setTicketsCountValue(+validEventValue);
    };

    // /. functions

    useEffect(() => {
        const validBtnCondition = !isInputHasError && isFormControlsActive;
        document.addEventListener(
            'keydown',
            e => validBtnCondition && onDocKeyDownClick(e.key)
        );
        return () => {
            document.removeEventListener('keydown', e =>
                onDocKeyDownClick(e.key)
            );
        };
    }, [isInputHasError, isFormControlsActive, onDocKeyDownClick]);

    useEffect(() => {
        // handle convertedTimesData[] length
        if (convertedTimesData.length === 0) {
            setTimesDataEmptyStatus(true);
        } else {
            setTimesDataEmptyStatus(false);
        }
    }, [convertedTimesData, routeNameValue]);

    // /. effects

    return (
        <form
            ref={formRef}
            className="timetable__form timetable-form"
            onSubmit={e => e.preventDefault()}
        >
            <fieldset className="timetable-form__group timetable-form__group--route">
                <label
                    className="timetable-form__label"
                    htmlFor="route"
                >
                    Выберите направление
                </label>
                <select
                    className="timetable-form__select"
                    name="route"
                    id="route"
                    required
                    disabled={!isFormControlsActive}
                    onChange={e => setRouteNameValue(e.target.value)}
                >
                    {isFormControlsActive ? (
                        <>
                            {routesData.map((route: Iroute) => {
                                return (
                                    <TimetableFormOpt
                                        key={route.id}
                                        {...route}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <PlaceholderOption
                            value={'loading routes names data...'}
                        />
                    )}
                </select>
            </fieldset>
            <fieldset className="timetable-form__group timetable-form__group--time">
                <label
                    className="timetable-form__label"
                    htmlFor="time"
                >
                    Выберите время
                </label>
                <select
                    className="timetable-form__select"
                    name="time"
                    id="time"
                    required
                    disabled={!isFormControlsActive}
                    onChange={e =>
                        setStartTimeValue(
                            e.target.value.replace(/[^0-9:]/g, '')
                        )
                    }
                >
                    {isFormControlsActive ? (
                        <>
                            {isTimesDataEmpty ? (
                                <PlaceholderOption value={'no matched yet'} />
                            ) : (
                                <>
                                    {convertedTimesData?.map((time: Itime) => {
                                        return (
                                            <TimetableFormOpt
                                                key={time.id}
                                                {...time}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </>
                    ) : (
                        <PlaceholderOption
                            value={'loading routes time data...'}
                        />
                    )}
                </select>
            </fieldset>
            <fieldset className="timetable-form__group timetable-form__group--tickets">
                <label
                    className="timetable-form__label"
                    htmlFor="num"
                >
                    <span
                        className="timetable-form__label-text"
                        data-prompt={'use up/down arrows for control'}
                    >
                        Количество билетов
                    </span>
                </label>
                <input
                    className={
                        isInputHasError
                            ? 'timetable-form__input invalid'
                            : 'timetable-form__input'
                    }
                    type="text"
                    id="num"
                    required
                    autoFocus
                    disabled={!isFormControlsActive}
                    autoComplete="off"
                    value={ticketsCountValue}
                    onBlur={ticketInput.onInputBlur}
                    onChange={e => onInputTicketsChange(e)}
                />
                <>
                    {isInputHasError && (
                        <>
                            {ticketInput.minLengthError ? (
                                <span className="timetable-form__error">
                                    min count tickets should be more{' '}
                                    <b>{ticketInput.minLengthCount}</b>
                                </span>
                            ) : (
                                <span className="timetable-form__error">
                                    max count of tickets cannot be more than{' '}
                                    <b>{ticketInput.maxLengthCount}</b>
                                </span>
                            )}
                        </>
                    )}
                </>
            </fieldset>
            <>
                {isDataCalculated ? (
                    <button
                        className="timetable-form__button timetable-form__button--reset"
                        type="reset"
                        onClick={onButtonResetClick}
                    >
                        Сбросить
                    </button>
                ) : (
                    <button
                        className="timetable-form__button timetable-form__button--calc"
                        type="submit"
                        disabled={!isFormValid || !isFormControlsActive}
                        onClick={onButtonCalcClick}
                    >
                        Посчитать
                    </button>
                )}
            </>
        </form>
    );
};

export default TimetableForm;
