import React from 'react';

// /. imports

interface propsTypes {
    id: number;
    isSelected: boolean;
    time: string;

    onTimeButtonClick: (arg1: number, arg2: number) => void;
    service_id: number;
}

// /. interfaces

const TimeTemplate: React.FC<propsTypes> = props => {
    const { id, isSelected, time, onTimeButtonClick, service_id } = props;

    return (
        <button
            className={
                isSelected
                    ? 'flight-time__option selected'
                    : 'flight-time__option'
            }
            onClick={() => onTimeButtonClick(service_id, id)}
        >
            {time}
        </button>
    );
};

export default TimeTemplate;
