import React from 'react';

import { Outlet } from 'react-router';

import NavList from '../Nav/NavList';

// /. imports

const Layout: React.FC = () => {
    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <NavList />
                </div>
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer"></footer>
        </div>
    );
};

export default Layout;
