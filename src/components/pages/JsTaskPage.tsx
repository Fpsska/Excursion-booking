import React, { useState, useEffect } from 'react';

import { addDeficientDigit } from '../../helpers/addDeficientDigit';

// /.imports

const JsTaskPage: React.FC = () => {
    const [routeNameValue, setRouteNameValue] = useState<string>('из A в B');

    const [startTimeValue, setStartTimeValue] = useState<string>('0');
    const [endTimeValue, setEndTimeValue] = useState<string>('0');
    const [travelTimeValue, setTravelTimeValue] = useState<string>('50'); // one way time = 50 min

    const [ticketsCountValue, setTicketsCountValue] = useState<number>(1);
    const [ticketsPriceValue, setTicketsPriceValue] = useState<number>(0);

    useEffect(() => {
        // update endTimeValue
        const [hours, minutes] = startTimeValue.split(':');
        const totalMinutes = +hours * 60 + +minutes + +travelTimeValue;
        const totalConvertedMinutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        setEndTimeValue(
            `${addDeficientDigit(totalHours)}:${addDeficientDigit(
                totalConvertedMinutes
            )}`
        );
    }, [startTimeValue]);

    return (
        <div className="timetable">
            <div className="timetable__wrapper">
                <form
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
                            <option
                                className="timetable-form__opt"
                                value="из A в B"
                            >
                                из A в B
                            </option>
                            <option
                                className="timetable-form__opt"
                                value="из B в A"
                            >
                                из B в A
                            </option>
                            <option
                                className="timetable-form__opt"
                                value="из A в B и обратно в А"
                            >
                                из A в B и обратно в А
                            </option>
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
                            <option
                                className="timetable-form__opt"
                                value="18:00(из A в B)"
                            >
                                18:00(из A в B)
                            </option>
                            <option
                                className="timetable-form__opt"
                                value="18:30(из A в B)"
                            >
                                18:30(из A в B)
                            </option>
                            <option
                                className="timetable-form__opt"
                                value="18:45(из A в B)"
                            >
                                18:45(из A в B)
                            </option>
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
                            onChange={e =>
                                setTicketsCountValue(+e.target.value)
                            }
                        />
                    </fieldset>
                    <button
                        className="timetable-form__button"
                        type="submit"
                    >
                        Посчитать
                    </button>
                </form>
                <div className="timetable__output">
                    <p className="timetable__output-text">
                        Вы выбрали <strong>{ticketsCountValue}</strong> билета
                        по маршруту <strong>{routeNameValue}</strong> стоимостью{' '}
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
            </div>
        </div>
    );
};

export default JsTaskPage;
