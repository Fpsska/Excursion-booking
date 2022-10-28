import { useState, useEffect } from 'react';

// /. imports

interface Ivalidation {
    [key: string]: number
}

interface outputTypes {
    value: number
    minLengthError: boolean
    minLengthCount: number
    maxLengthError: boolean
    maxLengthCount: number
    isInputValid: boolean
    isInputActive: boolean
    onInputBlur: () => void
}

// /. interfaces

export function useValidation(value: number, validations: Ivalidation): outputTypes {

    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [maxLengthError, setMaxLengthError] = useState<boolean>(false);

    const [minLengthCount, setminLengthCount] = useState<number>(0);
    const [maxLengthCount, setmaxLengthCount] = useState<number>(10);

    const [isInputActive, setInputActiveStatus] = useState<boolean>(false);
    const [isInputValid, setInputValidStatus] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
                    setminLengthCount(validations[validation]);
                    break;
                case 'maxLength':
                    value > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
                    setmaxLengthCount(validations[validation]);
                    break;
            }
        }
    }, [value, validations]);

    useEffect(() => {
        if (minLengthError || maxLengthError) {
            setInputValidStatus(false);
        } else {
            setInputValidStatus(true);
        }
    }, [minLengthError, maxLengthError]);

    const onInputBlur = (): void => {
        setInputActiveStatus(true);
    };

    return {
        value,
        minLengthError,
        minLengthCount,
        maxLengthError,
        maxLengthCount,
        isInputValid,
        isInputActive,
        onInputBlur
    };

}