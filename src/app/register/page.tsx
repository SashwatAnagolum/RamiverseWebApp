'use client'

import Button from "@/components/Button/Button";
import FormInputField from "@/components/FormInputField/FormInputField";

import { useState } from "react";

// TODO: talk to server here. For now, just returning a random value.
// 1 measn bad login
// if it is a good login (2), set the global state to logged in.
function registerSubmitHandler(username: string, password: string,
    setLoginValid: (valid: number) => void): void {
    let num = Math.floor(Math.random() * 2) + 1;
    setLoginValid(num);
}

function checkUsernameValidity(usernameString: string): boolean {
    return true;
}

function checkPasswordValidity(passwordString: string): boolean {
    return true;
}

export default function Login() {
    const [usernameString, setUsernameString] = useState('');
    const [passwordString, setPasswordString] = useState('');
    const [registerValid, setRegisterValid] = useState(0);

    let usernameValidity = checkUsernameValidity(usernameString);
    let passwordValidity = checkPasswordValidity(passwordString);

    let statusDivClassNames = 'mb-2 border-4 rounded-xl p-2 max-w-sm';
    let statusDivText = '';

    if (registerValid == 0) {
        statusDivClassNames += ' opacity-0';
        statusDivText = '<br><br>';
    } else if (registerValid == 1) {
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Please ensure that the chosen username and password are valid.';
    } else {
        statusDivClassNames += ' opacity-100 border-darkgreen bg-lightgreen/30';
        statusDivText = 'Account creation successful.';
    }

    return (
        <div className="p-5 h-full flex flex-col items-center">
            <div className="w-full flex flex-row justify-around mb-5">
                <h2 className="page-title">Join the Ramiverse</h2>
            </div>
            <div className={statusDivClassNames}>
                <p>{statusDivText}</p>
            </div>
            <div className="w-full flex flex-col gap-5 max-w-sm border-4 p-5 border-lightgrey rounded-xl">
                <FormInputField
                    fieldName="Username"
                    type="text"
                    setter={setUsernameString}
                    isValid={usernameValidity}
                    value={usernameString}
                ></FormInputField>
                <FormInputField
                    fieldName="Password"
                    type="password"
                    setter={setPasswordString}
                    isValid={passwordValidity}
                    value={passwordString}
                ></FormInputField>
                <Button
                    text="Register"
                    type="submit"
                    theme="blue"
                    clickHandler={
                        () => registerSubmitHandler(
                            usernameString, passwordString,
                            setRegisterValid
                        )
                    }
                ></Button>
            </div>
        </div>
    );
}