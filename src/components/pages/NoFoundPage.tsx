import React from 'react';

import { NavLink } from 'react-router-dom';

// /.imports

const NoFoundPage: React.FC = () => {
    return (
        <div>
            <h1>NoFound Page</h1>
            <p>
                relocate to <NavLink to={'/NevaTrip-Task/'}>home page</NavLink>
            </p>
        </div>
    );
};

export default NoFoundPage;
