import React, { useState, useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';

import CardList from '../Card/CardList';

// /. imports

const MainPage: React.FC = () => {
    const { servicesData } = useAppSelector(state => state.mainSlice);

    const [isServicesDataEmpty, setServicesDataEmptyStatus] =
        useState<boolean>(false);

    useEffect(() => {
        servicesData.length === 0
            ? setServicesDataEmptyStatus(true)
            : setServicesDataEmptyStatus(false);
    }, [servicesData]);

    return (
        <section className="services">
            <div className="container">
                <div className="services__wrapper">
                    {isServicesDataEmpty ? (
                        <div className="services__notice notice">
                            <h1 className="notice__caption">
                                Sorry, offer list is empty right now. Coming
                                soon!
                            </h1>
                        </div>
                    ) : (
                        <CardList />
                    )}
                </div>
            </div>
        </section>
    );
};

export default MainPage;
