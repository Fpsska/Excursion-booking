import React from 'react';

import { Itime } from '../../types/cardTypes';

import TimeTemplate from './TimeTemplate';

import './time.scss';

// /. imports

interface propsTypes {
    data: Itime[];
    role: string;
    onTimeButtonClick: (arg1: number, arg2: number) => void;
    service_id: number;
}

// /. interfaces

const TimeList: React.FC<propsTypes> = props => {
    const { data, role, onTimeButtonClick, service_id } = props;
    return (
        <div className={role ? `${role} flight-time` : 'flight-time'}>
            {data.map((time: Itime) => {
                return (
                    <TimeTemplate
                        key={time.id}
                        {...time}
                        onTimeButtonClick={onTimeButtonClick}
                        service_id={service_id}
                    />
                );
            })}
        </div>
    );
};

export default TimeList;
