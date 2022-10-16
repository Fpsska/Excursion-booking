import React from 'react';

// /. imports

interface propsTypes {
    id: number;
    isSelected: boolean;
    isVisible: boolean;
    time: string;

    onTimeButtonClick: (arg1: number, arg2: number) => void;
    service_id: number;
}

// /. interfaces

const TimeTemplate: React.FC<propsTypes> = props => {
    const { id, isSelected, isVisible, time, onTimeButtonClick, service_id } =
        props;

    return (
        <button
            className={`flight-time__option ${isSelected ? 'selected' : ''} ${
                !isVisible ? 'hidden' : ''
            }`}
            onClick={() => onTimeButtonClick(service_id, id)}
        >
            {time}
        </button>
    );
};

export default TimeTemplate;
