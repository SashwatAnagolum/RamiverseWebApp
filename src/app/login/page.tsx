'use client'

import Button from "@/components/Button/Button";
import FormInputField from "@/components/FormInputField/FormInputField";

import { useState } from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchWithTimeout from "../api/utils";

async function loginSubmitHandler(username: string, password: string,
    setLoginValid: (valid: number) => void): Promise<void> {
    if (!username.length || !password.length) {
        setLoginValid(1);
    } else {
        const data = await fetchWithTimeout(
            './api/login',
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
                        setLoginValid(2);
                        return;
                    }
                }
            }
        } else {
            setLoginValid(3);
            return;
        }

        setLoginValid(1);
    }
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
    const [loginValid, setLoginValid] = useState(0);

    const router = useRouter();

    useEffect(
        () => {
            if (loginValid == 2) {
                router.push('/userprofile');
            }
        }
    );

    let usernameValidity = checkUsernameValidity(usernameString);
    let passwordValidity = checkPasswordValidity(passwordString);

    let statusDivClassNames = 'mb-2 border-4 rounded-xl p-2  max-w-sm';
    let statusDivText = '';

    if (loginValid == 0) {
        statusDivClassNames += ' opacity-0';
        statusDivText = '<br><br>';
    } else if (loginValid == 1) {
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Your login credentials were incorrect. Please try again!';
    } else if (loginValid == 3) {
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Unable to contact server! Please try again later.';
    } else {
        statusDivClassNames += ' opacity-0';
    }

    return (
        <div className="p-5 h-full flex flex-col items-center">
            <div className="w-full flex flex-row justify-around mb-5">
                <h2 className="page-title">Enter the Ramiverse</h2>
            </div>
            <div className={statusDivClassNames}>
                <p>{statusDivText}</p>
            </div>
            <div className="w-full flex flex-col gap-5 max-w-sm border-4 p-5 border-lightgrey rounded-xl items-center">
                <FormInputField
                    fieldName="Username"
                    type="text"
                    invalidPrompt=""
                    setter={setUsernameString}
                    isValid={usernameValidity}
                    value={usernameString}
                ></FormInputField>
                <FormInputField
                    fieldName="Password"
                    type="password"
                    invalidPrompt=""
                    setter={setPasswordString}
                    isValid={passwordValidity}
                    value={passwordString}
                ></FormInputField>
                <Button
                    text="Login"
                    type="submit"
                    theme="blue"
                    clickHandler={
                        () => loginSubmitHandler(
                            usernameString, passwordString,
                            setLoginValid
                        )
                    }
                ></Button>
            </div>
        </div>
    );
}