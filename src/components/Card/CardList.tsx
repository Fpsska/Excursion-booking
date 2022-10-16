import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';

import { Icard } from '../../types/cardTypes';

import CardTemplate from './CardTemplate';

import './card.scss';

// /. imports

const CardList: React.FC = () => {
    const { servicesData } = useAppSelector(state => state.mainSlice);

    const [cardData, setCardData] = useState<Icard[]>(servicesData);

    useEffect(() => {
        setCardData(servicesData);
    }, [servicesData]);

    return (
        <div className="services__list">
            {cardData.map((card: Icard) => {
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
