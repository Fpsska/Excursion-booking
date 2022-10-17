import React from 'react';

import { Route, Routes } from 'react-router';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/NevaTrip-Task"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<MainPage />}
                    />
                    <Route />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
