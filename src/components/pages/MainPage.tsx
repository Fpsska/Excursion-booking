import React from 'react';

import image_1 from '../../assets/images/image-1.png';

// /. imports

const MainPage: React.FC = () => {
    return (
        <section className="services">
            <div className="container">
                <div className="services__wrapper">
                    <div className="services__card card">
                        <div className="card__wrapper">
                            <div
                                className="card__preview"
                                data-title="Новинка"
                            >
                                <img
                                    className="card__image"
                                    src={image_1}
                                    alt="some image"
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
                                    <span className="card__time">2 часа</span>
                                </div>
                                <h2 className="card__caption">
                                    АКЦИЯ - Обзорная экскурсия по рекам и
                                    каналам с остановками Hop on Hop Off 2019
                                </h2>
                                <ul className="card__description description">
                                    <li className="description__item">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.24255 13.4204C6.51714 14.1458 5.3401 14.1458 4.61504 13.4204L0.544058 9.34931C-0.181353 8.62423 -0.181353 7.44716 0.544058 6.72209C1.26912 5.99666 2.44616 5.99666 3.17157 6.72209L5.59708 9.1473C5.78018 9.33005 6.07742 9.33005 6.26087 9.1473L12.8284 2.57959C13.5535 1.85417 14.7305 1.85417 15.4559 2.57959C15.8043 2.92795 16 3.4006 16 3.8932C16 4.38581 15.8043 4.85845 15.4559 5.20681L7.24255 13.4204Z"
                                                fill="#FECF01"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="description__link"
                                        >
                                            Билет на целый день
                                        </a>
                                    </li>
                                    <li className="description__item">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.24255 13.4204C6.51714 14.1458 5.3401 14.1458 4.61504 13.4204L0.544058 9.34931C-0.181353 8.62423 -0.181353 7.44716 0.544058 6.72209C1.26912 5.99666 2.44616 5.99666 3.17157 6.72209L5.59708 9.1473C5.78018 9.33005 6.07742 9.33005 6.26087 9.1473L12.8284 2.57959C13.5535 1.85417 14.7305 1.85417 15.4559 2.57959C15.8043 2.92795 16 3.4006 16 3.8932C16 4.38581 15.8043 4.85845 15.4559 5.20681L7.24255 13.4204Z"
                                                fill="#FECF01"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="description__link"
                                        >
                                            Неограниченное число катаний
                                        </a>
                                    </li>
                                    <li className="description__item">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.24255 13.4204C6.51714 14.1458 5.3401 14.1458 4.61504 13.4204L0.544058 9.34931C-0.181353 8.62423 -0.181353 7.44716 0.544058 6.72209C1.26912 5.99666 2.44616 5.99666 3.17157 6.72209L5.59708 9.1473C5.78018 9.33005 6.07742 9.33005 6.26087 9.1473L12.8284 2.57959C13.5535 1.85417 14.7305 1.85417 15.4559 2.57959C15.8043 2.92795 16 3.4006 16 3.8932C16 4.38581 15.8043 4.85845 15.4559 5.20681L7.24255 13.4204Z"
                                                fill="#FECF01"
                                            />
                                        </svg>
                                        <a
                                            href="#"
                                            className="description__link"
                                        >
                                            6 остановок у главных
                                            достопримечательностей
                                        </a>
                                    </li>
                                    <li className="description__item description__item--time">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.24255 13.4204C6.51714 14.1458 5.3401 14.1458 4.61504 13.4204L0.544058 9.34931C-0.181353 8.62423 -0.181353 7.44716 0.544058 6.72209C1.26912 5.99666 2.44616 5.99666 3.17157 6.72209L5.59708 9.1473C5.78018 9.33005 6.07742 9.33005 6.26087 9.1473L12.8284 2.57959C13.5535 1.85417 14.7305 1.85417 15.4559 2.57959C15.8043 2.92795 16 3.4006 16 3.8932C16 4.38581 15.8043 4.85845 15.4559 5.20681L7.24255 13.4204Z"
                                                fill="#FECF01"
                                            />
                                        </svg>
                                        <div className="description__item-wrapper">
                                            <a
                                                href="#"
                                                className="description__link"
                                            >
                                                Ближайший рейс сегодня
                                            </a>
                                            <div className="description__flight-time">
                                                <button className="description__flight-button">
                                                    12:00
                                                </button>
                                                <button className="description__flight-button">
                                                    12:00
                                                </button>
                                                <button className="description__flight-button">
                                                    12:00
                                                </button>
                                                <button className="description__flight-button">
                                                    12:00
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <div className="card__bottom">
                                    <div className="card__price price">
                                        <span className="price__value price__value--general">
                                            900 ₽
                                        </span>
                                        <span className="price__valueprice__value--additional">
                                            1200 р на причале
                                        </span>
                                    </div>
                                    <a
                                        className="card__link"
                                        href="#"
                                    >
                                        Подробнее
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPage;
