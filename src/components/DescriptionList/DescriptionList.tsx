import React, { useEffect, useState } from 'react';

import { Idescription, Itime } from '../../types/cardTypes';

import DescriptionTemplate from './DescriptionTemplate';
import DescriptionExtendedTemplate from './DescriptionExtendedTemplate';

import './description.scss';

// /. imports

interface propTypes {
    descrData: Idescription[];
    timesData: Itime[];
    role?: string;
    isAllowableRes: boolean;
    service_id: number;
    onTimeOptionClick: (arg1: number, arg2: number) => void;
}

// /. interfaces

const DescriptionList: React.FC<propTypes> = ({
    descrData,
    timesData,
    role,
    isAllowableRes,
    service_id,
    onTimeOptionClick
}) => {
    const [descriptionData, setDescriptionData] =
        useState<Idescription[]>(descrData);

    const [extendDescrDataEl, setExtendedDescrDataEl] =
        useState<Idescription[]>(descrData);

    useEffect(() => {
        setDescriptionData(descrData.slice(0, -1));
        setExtendedDescrDataEl(descrData.slice(-1));
    }, [descrData]);

    return (
        <ul className={role ? `${role} description` : 'description'}>
            {descriptionData.map((template: Idescription) => {
                return (
                    <DescriptionTemplate
                        key={template.id}
                        {...template}
                    ></DescriptionTemplate>
                );
            })}
            {!isAllowableRes &&
                extendDescrDataEl.map((template: Idescription) => {
                    return (
                        <DescriptionExtendedTemplate
                            key={template.id}
                            {...template}
                            service_id={service_id}
                            timesData={timesData}
                            onTimeOptionClick={onTimeOptionClick}
                        ></DescriptionExtendedTemplate>
                    );
                })}
        </ul>
    );
};

export default DescriptionList;
