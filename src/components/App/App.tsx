import React from 'react';

import MainPage from '../pages/MainPage';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="page">
                <header className="header"></header>
                <main className="main">
                    <MainPage />
                </main>
                <footer className="footer"></footer>
            </div>
        </div>
    );
};

export default App;
