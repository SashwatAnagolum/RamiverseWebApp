'use client'

type FormInputFieldProps = {
    fieldName: string;
    type: string;
    isValid: boolean;
    setter: (newString: string) => void;
    value: string;
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

    if (props.isValid) {
        inputClassName += ' focus:border-darkgrey';
    } else {
        inputClassName += ' focus:border-darkred focus:bg-lightred';
    }

    return (
        <div className="w-full flex flex-col items-start">
            <p className="text-sm text-darkgrey pl-2 pb-1">{props.fieldName}</p>
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
        </div>
    );

}