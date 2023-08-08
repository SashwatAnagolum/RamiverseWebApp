'use client'

type FormInputFieldProps = {
    fieldName: string;
    type: string;
    isValid: boolean;
    setter: (newString: string) => void;
    value: string;
    invalidPrompt: string;
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
    const validatorChoices = new Map();
    validatorChoices.set('username', usernameValidation);
    validatorChoices.set('password', passwordValidation);

    let inputClassName: string = 'w-full p-2 rounded-lg border-2 border-lightgrey focus:outline-none';
    let invalidTextClass: string = 'text-sm px-2 pt-2 text-darkred';

    if (props.isValid || (props.value.length == 0)) {
        inputClassName += ' focus:border-darkgrey';
        invalidTextClass += ' opacity-0';
    } else {
        inputClassName += ' focus:border-darkred focus:bg-lightred';
        invalidTextClass += ' opacity-100';
    }

    return (
        <div className="w-full flex flex-col items-start">
            <p className="text-sm text-darkgrey px-2 pb-1">{props.fieldName}</p>
            <input
                className={inputClassName}
                type={props.type}
                placeholder={props.fieldName} value={props.value}
                onChange={
                    (e) => {
                        props.setter(e.target.value);
                    }
                }
            />
            <p className={invalidTextClass}>{props.invalidPrompt}</p>
        </div>
    );

}