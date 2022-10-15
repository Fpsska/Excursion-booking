import React, { useState, useEffect } from 'react';

import { servicesData as mockData } from '../../data/servicesData';

import { Icard, Itime } from '../../types/cardTypes';

import CardTemplate from './CardTemplate';

import './card.scss';

// /. imports

const CardList: React.FC = () => {
    const [servicesData, setServicesData] = useState<Icard[]>(mockData);

    useEffect(() => {
        setServicesData(mockData);
    }, [mockData]);

    const onTimeButtonClick = (service_id: number, option_id: number): void => {
        const arrayCopy = [...servicesData];

        const targetServiceIDX = servicesData.findIndex(
            (service: Icard) => service.id === service_id
        );

        arrayCopy[targetServiceIDX]?.flightTimes.map((opt: Itime) =>
            opt.id === option_id
                ? (opt.isSelected = true)
                : (opt.isSelected = false)
        );
        setServicesData(arrayCopy);
    };

    return (
        <div className="services__list">
            {servicesData.map((card: Icard) => {
                return (
                    <CardTemplate
                        key={card.id}
                        {...card}
                        onTimeButtonClick={onTimeButtonClick}
                    />
                );
            })}
        </div>
    );
};

export default CardList;
