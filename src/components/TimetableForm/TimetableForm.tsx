import React, { useRef } from 'react';

import { useAppSelector } from '../../app/hooks';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import TimetableFormOpt from './TimetableFormOpt';

// /. imports

interface propTypes {
    routeNameValue: string;
    startTimeValue: string;
    ticketsCountValue: number;
    isDataCalculated: boolean;
    setRouteNameValue: (arg: string) => void;
    setStartTimeValue: (arg: string) => void;
    setDataCalculatedStatus: (arg: boolean) => void;
    setTicketsCountValue: (arg: number) => void;
}

// /. interfaces

const TimetableForm: React.FC<propTypes> = props => {
    const {
        routeNameValue,
        startTimeValue,
        ticketsCountValue,
        isDataCalculated,
        setRouteNameValue,
        setStartTimeValue,
        setDataCalculatedStatus,
        setTicketsCountValue
    } = props;

    const { routesData, timesData, convertedTimesData } = useAppSelector(
        state => state.formSlice
    );

    // console.log(convertedTimesData);

    const formRef = useRef<HTMLFormElement>(null!);

    const isFormValid = routeNameValue && startTimeValue && ticketsCountValue;

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
                    onChange={e => setRouteNameValue(e.target.value)}
                >
                    {routesData.map((route: Iroute) => {
                        return (
                            <TimetableFormOpt
                                key={route.id}
                                {...route}
                            />
                        );
                    })}
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
                    onChange={e =>
                        setStartTimeValue(
                            e.target.value.replace(/[^0-9:]/g, '')
                        )
                    }
                >
                    {convertedTimesData.map((time: Itime) => {
                        return (
                            <TimetableFormOpt
                                key={time.id}
                                {...time}
                            />
                        );
                    })}
                </select>
            </fieldset>
            <fieldset className="timetable-form__group timetable-form__group--tickets">
                <label
                    className="timetable-form__label"
                    htmlFor="num"
                >
                    Количество билетов
                </label>
                <input
                    className="timetable-form__input"
                    type="text"
                    id="num"
                    required
                    autoFocus
                    autoComplete="off"
                    value={ticketsCountValue}
                    onChange={e => onInputTicketsChange(e)}
                />
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
                        disabled={!isFormValid}
                        onClick={() => isFormValid && onButtonCalcClick()}
                    >
                        Посчитать
                    </button>
                )}
            </>
        </form>
    );
};

export default TimetableForm;
