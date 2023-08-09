'use client'

import Button from "@/components/Button/Button";
import FormInputField from "@/components/FormInputField/FormInputField";

import { useState } from "react";
import fetchWithTimeout from "../api/utils";

async function registerSubmitHandler(username: string, password: string,
    isUsernameValid: boolean, isPasswordValid: boolean,
    setRegisterValid: (valid: number) => void): Promise<void> {
    if (!isUsernameValid || !isPasswordValid) {
        setRegisterValid(1);
    } else {
        const data = await fetchWithTimeout(
            './api/registration',
            {
                headers: {
                    'username': username,
                    'password': password
                }
            }
        );

        if (data.status == 200) {
            if (data.body) {
                const responseBody = await data.body.getReader().read();

                if (responseBody.value) {
                    const responseText = new TextDecoder().decode(responseBody.value);

                    if (responseText == 'valid') {
                        setRegisterValid(2);
                    } else if (responseText == 'nonunique') {
                        setRegisterValid(3);
                    } else {
                        setRegisterValid(1);
                    }

                    return;
                }
            }
        } else {
            setRegisterValid(4);
        }

        setRegisterValid(1);
    }
}

function checkUsernameValidity(usernameString: string): boolean {
    return usernameString.length > 5 && !usernameString.includes(' ');
}

function checkPasswordValidity(passwordString: string): boolean {
    const digitChecker = new RegExp('\\d');
    const symbolChecker = new RegExp('[!@#$%^&*();:]');

    return (
        passwordString.length > 5 &&
        digitChecker.test(passwordString) &&
        symbolChecker.test(passwordString)
    );
}

export default function Register() {
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
    } else if (registerValid == 3) {
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Chosen username is taken! Choose another username.';
    } else if (registerValid == 4) {
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Unable to contact server! Please try again later.';
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
                    invalidPrompt="Usernames need to be atleast 5 characters long."
                    setter={setUsernameString}
                    isValid={usernameValidity}
                    value={usernameString}
                ></FormInputField>
                <FormInputField
                    fieldName="Password"
                    type="password"
                    invalidPrompt="Passwords need to be atleast 5 characters long, contain a number, and a special character."
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
                            usernameValidity, passwordValidity,
                            setRegisterValid
                        )
                    }
                ></Button>
            </div>
        </div>
    );
}