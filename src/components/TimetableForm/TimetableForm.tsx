import React, { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { filterTimesData } from '../../app/slices/formSlice';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import { useValidation } from '../../hooks/useValidation';

import TimetableFormOpt from './TimetableFormOpt';
import PlaceholderOption from './PlaceholderOption';

import './timeTable-form.scss';

// /. imports

interface propTypes {
    routeNameValue: string;
    ticketsCountValue: number;
    fullTimeValue: string;
    isDataCalculated: boolean;
    isTimesDataEmpty: boolean;
    setRouteNameValue: (arg: string) => void;
    setStartTimeValue: (arg: string) => void;
    setEndTimeValue: (arg: string) => void;
    setDataCalculatedStatus: (arg: boolean) => void;
    setTicketsCountValue: (arg: number) => void;
    setFullTimeValue: (arg: string) => void;
    handleEventByRouteName: (arg: string) => void;
}

// /. interfaces

const TimetableForm: React.FC<propTypes> = props => {
    const {
        routeNameValue,
        ticketsCountValue,
        fullTimeValue,
        isDataCalculated,
        isTimesDataEmpty,
        setRouteNameValue,
        setStartTimeValue,
        setDataCalculatedStatus,
        setTicketsCountValue,
        setFullTimeValue,
        handleEventByRouteName
    } = props;

    // /. props

    const {
        routesData,
        routesDataErrorStatus,
        routesDataFetchStatus,
        convertedTimesData,
        timesData,
        filteredTimesData
    } = useAppSelector(state => state.formSlice);

    const ticketInput = useValidation(ticketsCountValue, {
        minLength: 1,
        maxLength: 10
    });

    const formRef = useRef<HTMLFormElement>(null!);
    const inputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useAppDispatch();

    // /. hooks

    const isFormValid =
        ticketsCountValue >= ticketInput.minLengthCount &&
        ticketsCountValue <= ticketInput.maxLengthCount;

    const isResponseValid =
        !routesDataErrorStatus && routesDataFetchStatus === 'success';

    const isInputHasError =
        ticketInput.isInputActive && !ticketInput.isInputValid;

    // variables

    const onButtonCalcClick = (e: any): void => {
        e.preventDefault();
        setDataCalculatedStatus(true);
    };

    const onButtonResetClick = (): void => {
        formRef.current.reset();
        setTicketsCountValue(1);
        setDataCalculatedStatus(false);
        setFullTimeValue([...convertedTimesData][0]?.value);
        setStartTimeValue(
            [...convertedTimesData][0]?.value.replace(/[^0-9:]/g, '')
        );
    };

    const onInputTicketsChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const eventValue = e.target.value.replace(/[^0-9]/g, '');
        setTicketsCountValue(+eventValue);
    };

    const onSelectRouteChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        setRouteNameValue(e.target.value);
        handleEventByRouteName(e.target.value);
    };

    const onSelectTimeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const eventValue = e.target.value;
        setFullTimeValue(eventValue);
        setStartTimeValue(eventValue.replace(/[^0-9:]/g, ''));
    };

    // /. functions

    useEffect(() => {
        // set initial value for all selects after success getting API data
        // make initial filtering timesData[]
        if (isResponseValid && !isTimesDataEmpty) {
            setRouteNameValue('из A в B');
            dispatch(filterTimesData({ filterProp: 'из A в B' }));
            inputRef.current.focus();
        }
    }, [isResponseValid, isTimesDataEmpty]);

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
                    disabled={!isResponseValid}
                    value={routeNameValue}
                    onChange={e => onSelectRouteChange(e)}
                >
                    {isResponseValid ? (
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
                    disabled={!isResponseValid}
                    value={fullTimeValue}
                    onChange={e => onSelectTimeChange(e)}
                >
                    {isResponseValid ? (
                        <>
                            {isTimesDataEmpty ? (
                                <PlaceholderOption value={'no matches yet'} />
                            ) : (
                                <>
                                    {convertedTimesData.map((time: Itime) => {
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
                    ref={inputRef}
                    className={
                        isInputHasError
                            ? 'timetable-form__input invalid'
                            : 'timetable-form__input'
                    }
                    type="text"
                    id="num"
                    required
                    disabled={!isResponseValid || isTimesDataEmpty}
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
                {isDataCalculated && !isTimesDataEmpty ? (
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
                        disabled={
                            !isFormValid || !isResponseValid || isTimesDataEmpty
                        }
                        onClick={e => onButtonCalcClick(e)}
                    >
                        Посчитать
                    </button>
                )}
            </>
        </form>
    );
};

export default TimetableForm;
