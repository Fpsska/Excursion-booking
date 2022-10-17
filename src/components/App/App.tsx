import React from 'react';

import { Route, Routes } from 'react-router';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage';
import JsTaskPage from '../pages/JsTaskPage';
import NoFoundPage from '../pages/NoFoundPage';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="NevaTrip-Task"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<MainPage />}
                    />
                    <Route
                        path="js-task"
                        element={<JsTaskPage />}
                    />
                    <Route
                        path="*"
                        element={<NoFoundPage />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
