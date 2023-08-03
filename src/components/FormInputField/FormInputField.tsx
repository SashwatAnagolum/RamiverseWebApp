'use client'

import { useState } from 'react';

type FormInputFieldProps = {
    fieldName: string;
    type: string;
    validator: string;
};

function usernameValidation(username: string): boolean {
    if (username === '') {
        return true;
    }

    return username.length > 5;
}

function passwordValidation(password: string): boolean {
    return true;
}

export default function FormInputField(props: FormInputFieldProps) {
    const [inputValue, setInputValue] = useState("");

    const validatorChoices = new Map();
    validatorChoices.set('username', usernameValidation);
    validatorChoices.set('password', passwordValidation);

    let inputClassName: string = 'w-full p-2 rounded-lg border-2 border-lightgrey focus:outline-none';

    if (validatorChoices.has(props.validator)) {
        if (validatorChoices.get(props.validator)(inputValue)) {
            inputClassName += ' focus:border-darkgrey';
        } else {
            inputClassName += ' focus:border-darkred focus:bg-lightred';
        }
    } else {
        inputClassName += ' focus:border-darkgrey';
    }

    return (
        <div className="w-full flex flex-col items-start">
            <p className="text-sm text-darkgrey pl-2 pb-1">{props.fieldName}</p>
            <input
                className={inputClassName}
                type={props.type}
                placeholder={props.fieldName} value={inputValue}
                onChange={
                    (e) => {
                        setInputValue(e.target.value);
                    }
                }
            />
        </div>
    );

}