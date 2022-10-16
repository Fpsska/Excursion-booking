import React, { useState, useRef, useEffect } from 'react';

import { useAppDispatch } from '../../app/hooks';

import { switchTimeOptSelectedStatus } from '../../app/slices/mainSlice';

import { Iprice, Itime, Idescription } from '../../types/cardTypes';

import DescriptionList from '../DescriptionList/DescriptionList';
import TimeList from '../Time/TimeList';

import { useWidthHandler } from '../../hooks/useWidthHandler';
import { getRandomArrElement } from '../../helpers/getRandomArrElement';

// /. imports

interface propTypes {
    id: number;
    image: string;
    caption: string;
    duration: string;
    title: string;
    flightTimes: Itime[];
    description: Idescription[];
    prices: Iprice[];
}

// /. interfaces

const CardTemplate: React.FC<propTypes> = props => {
    const {
        id,
        image,
        caption,
        duration,
        title,
        flightTimes,
        description,
        prices
    } = props;

    const [currentColors, setCurrentColors] = useState<string>('#444');

    const dispatch = useAppDispatch();

    const { isAllowableRes } = useWidthHandler({ min: 300, max: 768 });

    const onTimeOptionClick = (service_id: number, option_id: number): void => {
        dispatch(switchTimeOptSelectedStatus({ service_id, option_id }));
    };

    useEffect(() => {
        setCurrentColors(
            getRandomArrElement(['#099CE8', '#FFD83C', '#7553FF'])
        );
    }, []);

    return (
        <article className="services__card card">
            <div className="card__wrapper">
                <div
                    className="card__preview"
                    style={{
                        backgroundColor: currentColors
                    }}
                    data-title={caption}
                >
                    <img
                        className="card__image"
                        src={require(`../../assets/images/${image}`)}
                        alt="some content image with attraction"
                    />
                </div>

                <div className="card__content">
                    <div className="card__duration">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_91_965)">
                                <path
                                    d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8 14.2977C4.52746 14.2977 1.7021 11.4727 1.7021 8C1.7021 4.5273 4.52746 1.70226 8 1.70226C11.4725 1.70226 14.2979 4.5273 14.2979 8C14.2979 11.4727 11.4725 14.2977 8 14.2977Z"
                                    fill="#C7C7C7"
                                />
                                <path
                                    d="M12.1692 7.75296H8.57401V3.43019C8.57401 3.06642 8.27907 2.77148 7.9153 2.77148C7.55153 2.77148 7.25659 3.06642 7.25659 3.43019V8.41167C7.25659 8.77544 7.55153 9.07037 7.9153 9.07037H12.1692C12.533 9.07037 12.8279 8.77544 12.8279 8.41167C12.8279 8.04789 12.533 7.75296 12.1692 7.75296Z"
                                    fill="#C7C7C7"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_91_965">
                                    <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="card__time">{duration}</span>
                    </div>
                    <h2 className="card__title">{title}</h2>

                    <DescriptionList
                        role={'card__description'}
                        descrData={description}
                        timesData={flightTimes}
                        isAllowableRes={isAllowableRes}
                        onTimeOptionClick={onTimeOptionClick}
                        service_id={id}
                    />

                    <>
                        {isAllowableRes && (
                            <TimeList
                                role={'card__flight-time'}
                                timesData={flightTimes}
                                service_id={id}
                                onTimeOptionClick={onTimeOptionClick}
                            />
                        )}
                    </>

                    <div className="card__bottom">
                        {prices.map((price: Iprice) => {
                            return (
                                <div
                                    key={price.id}
                                    className="card__price price"
                                >
                                    <span className="price__value price__value--general">
                                        {price.general}
                                    </span>
                                    <span className="price__value price__value--additional">
                                        {price.additional}
                                    </span>
                                </div>
                            );
                        })}
                        <a
                            className="card__link"
                            href="#"
                            onClick={e => e.preventDefault()}
                        >
                            Подробнее
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CardTemplate;
