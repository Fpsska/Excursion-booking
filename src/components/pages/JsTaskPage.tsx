import React from 'react';

// /.imports

const JsTaskPage: React.FC = () => {
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
                        Вы выбрали <strong>4</strong> билета по маршруту{' '}
                        <strong>из A в B</strong> стоимостью{' '}
                        <strong>4000р</strong>.
                    </p>
                    <p className="timetable__output-text">
                        {' '}
                        Это путешествие займет у вас <strong>40 минут</strong>.
                    </p>
                    <p className="timetable__output-text">
                        {' '}
                        Теплоход отправляется в <strong>12-00</strong>, а
                        прибудет в <strong>18-00</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JsTaskPage;
