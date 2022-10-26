import React from 'react';

// /. imports

interface propTypes {
    value: string;
}

// /. interfaces

const PlaceholderOption: React.FC<propTypes> = ({ value }) => {
    return (
        <option
            className="placeholder-option"
            value={value}
        >
            {value}
        </option>
    );
};

export default PlaceholderOption;
