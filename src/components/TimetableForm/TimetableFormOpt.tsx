import React from 'react';

// /. imports

interface propTypes {
    value: string;
}

// /. interfaces

const TimetableFormOpt: React.FC<propTypes> = ({ value }) => {
    return (
        <option
            className="timetable-form__opt"
            value={value}
        >
            {value}
        </option>
    );
};

export default TimetableFormOpt;
