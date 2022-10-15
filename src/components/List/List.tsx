import React from 'react';

import { Idescription } from '../../types/cardTypes';

import ListTemplate from './ListTemplate';

import './list.scss';

// /. imports

interface propTypes {
    data: Idescription[];
    role?: string;
}

// /. interfaces

const List: React.FC<propTypes> = ({ data, role }) => {
    return (
        <ul className={role ? `${role} description` : 'description'}>
            {data.map((template: Idescription) => {
                return (
                    <ListTemplate
                        key={template.id}
                        {...template}
                    />
                );
            })}
        </ul>
    );
};

export default List;
