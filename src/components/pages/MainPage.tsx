import React from 'react';

import CardList from '../Card/CardList';

// /. imports

const MainPage: React.FC = () => {
    return (
        <section className="services">
            <div className="container">
                <div className="services__wrapper">
                    <CardList />
                </div>
            </div>
        </section>
    );
};

export default MainPage;
