import React, { useState } from 'react';

import { Icard } from '../../types/cardTypes';

import CardTemplate from './CardTemplate';

import './card.scss';

// /. imports

const CardList: React.FC = () => {
    const [servicesData] = useState<Icard[]>([
        {
            id: 1,
            image: 'image-1.png',
            duration: '2 чаcа',
            caption:
                'АКЦИЯ - Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2019',
            description: [
                {
                    id: 1,
                    text: 'Билет на целый день'
                },
                {
                    id: 2,
                    text: 'Неограниченное число катаний'
                },
                {
                    id: 3,
                    text: '6 остановок у главных достопримечательностей'
                },
                {
                    id: 4,
                    text: 'Ближайший рейс сегодня'
                }
            ],
            flightTimes: [
                {
                    id: 1,
                    time: '12:00'
                },
                {
                    id: 2,
                    time: '12:00'
                },
                {
                    id: 3,
                    time: '12:00'
                },
                {
                    id: 4,
                    time: '12:00'
                }
            ],
            prices: [
                {
                    id: 1,
                    general: '900 ₽',
                    additional: '1200 р на причале'
                }
            ]
        },
        {
            id: 2,
            image: 'image-2.png',
            duration: '2 чаcа',
            caption:
                'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
            description: [
                {
                    id: 1,
                    text: 'Билет на целый день'
                },
                {
                    id: 2,
                    text: 'Неограниченное число катаний'
                },
                {
                    id: 3,
                    text: '6 остановок у главных достопримечательностей'
                },
                {
                    id: 4,
                    text: 'Ближайший рейс сегодня'
                }
            ],
            flightTimes: [
                {
                    id: 1,
                    time: '12:00'
                },
                {
                    id: 2,
                    time: '12:00'
                },
                {
                    id: 3,
                    time: '12:00'
                }
            ],
            prices: [
                {
                    id: 1,
                    general: '2900 ₽',
                    additional: '1200 р на причале'
                }
            ]
        }
    ]);

    return (
        <div className="services__list">
            {servicesData.map((card: Icard) => {
                return (
                    <CardTemplate
                        key={card.id}
                        {...card}
                    />
                );
            })}
        </div>
    );
};

export default CardList;
