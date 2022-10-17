import React from 'react';

import { NavLink } from 'react-router-dom';

import './nav.scss';

// /. imports

const NavList: React.FC = () => {
    return (
        <nav className="nav">
            <ul className="nav__menu">
                <li className="nav__item">
                    <NavLink
                        className="nav__link nav__link--main"
                        to="/NevaTrip-Task/"
                    >
                        HTML TASK
                    </NavLink>
                </li>
                <li className="nav__item">
                    <NavLink
                        className="nav__link nav__link--js"
                        to="js-task"
                    >
                        JS TASK
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavList;
