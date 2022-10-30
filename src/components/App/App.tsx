import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router';

import { useAppDispatch } from '../../app/hooks';

import { fetchRoutesData } from '../../app/api/fetchRoutesData';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage';
import JsTaskPage from '../pages/JsTaskPage';
import NoFoundPage from '../pages/NoFoundPage';

// /. imports

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // get routesData[], timesData[] from API
        setTimeout(() => {
            dispatch(fetchRoutesData());
        }, 1000);
    }, []);

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
