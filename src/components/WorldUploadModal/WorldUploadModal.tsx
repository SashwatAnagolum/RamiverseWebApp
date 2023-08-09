'use client'

import fetchWithTimeout from "@/app/api/utils";
import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton";
import FormInputField from '../FormInputField/FormInputField';

import { RefObject, useEffect, useRef, useState } from "react";

type WorldUploadModalProps = {
    isOpen: boolean;
    userID: string;
    stateChanger: () => void;
}

function handleFileUploadRequest(inputRef: RefObject<HTMLInputElement>) {
    if (inputRef.current) {
        inputRef.current.click();
    }
}

async function uploadFileToS3(filePath: string,
    fileToUpload: File, setValidUpload: (num: number) => void): Promise<boolean | void> {
    const data = await fetchWithTimeout(
        './api/presigned',
        {
            headers: {
                'request-type': 'put',
                'filename': filePath
            }
        }
    );

    const signedURL = await data.body?.getReader().read().then(
        (resp) => new TextDecoder().decode(resp.value)
    );

    if (fileToUpload && signedURL) {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', signedURL);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status != 200) {
                setValidUpload(2);
                return false;
            }
        }

        xhr.send(fileToUpload);
    }
}

async function uploadWorld(worldInputRef: RefObject<HTMLInputElement>,
    worldName: string, worldTags: string, userID: string, worldDesc: string,
    setValidUpload: (num: number) => void): Promise<boolean | void> {
    if (
        worldInputRef.current &&
        worldInputRef.current.files &&
        worldName.length &&
        worldTags.length
    ) {
        const worldUploadStatus = await uploadFileToS3(
            'worlds/' + worldName.replace(' ', '_').toLowerCase() + '/world',
            worldInputRef.current.files[0],
            setValidUpload
        );

        const response = await fetchWithTimeout(
            './api/worldupload',
            {
                headers: {
                    'worldName': worldName,
                    'worldTags': worldTags,
                    'worldCreator': userID,
                    'worldDesc': worldDesc
                }
            }
        );

        if (response.status != 200) {
            setValidUpload(2);
            return false;
        }
    } else {
        setValidUpload(1);
    }
}

async function uploadScreenshots(screenshotsInputRef: RefObject<HTMLInputElement>,
    worldName: string, setValidUpload: (num: number) => void): Promise<boolean | void> {
    if (
        screenshotsInputRef.current &&
        screenshotsInputRef.current.files
    ) {
        for (let i = 0; i < screenshotsInputRef.current.files.length; i++) {
            uploadFileToS3(
                'worlds/' + worldName + '/images/screenshot_' + i + '.png',
                screenshotsInputRef.current.files[i],
                setValidUpload
            ).then(
                (resp) => {
                    if (resp === false) {
                        setValidUpload(2);
                        return false;
                    }
                }
            )
        }
    } else {
        setValidUpload(1);
    }
}

async function handleSubmitRequest(worldInputRef: RefObject<HTMLInputElement>,
    screenshotsInputRef: RefObject<HTMLInputElement>,
    setValidUpload: (num: number) => void, worldName: string,
    worldTags: string, worldDesc: string, userID: string) {
    if (
        worldInputRef && screenshotsInputRef &&
        worldInputRef.current && screenshotsInputRef.current &&
        worldInputRef.current.files && screenshotsInputRef.current.files &&
        worldInputRef.current.files.length && screenshotsInputRef.current.files.length &&
        worldTags.length && worldName.length &&
        worldDesc.length
    ) {
        const retVal1 = await uploadWorld(worldInputRef, worldName, worldTags, userID, worldDesc, setValidUpload);
        const retVal2 = await uploadScreenshots(screenshotsInputRef, worldName, setValidUpload);

        if ((retVal1 == null) && (retVal2 == null)) {
            setValidUpload(3);
        }
    } else {
        setValidUpload(1);
    }
}

export default function WorldUploadModal(props: WorldUploadModalProps) {
    const [worldNameString, setWorldNameString] = useState('');
    const [worldTagString, setWorldTagString] = useState('');
    const [worldDescString, setWorldDescString] = useState('');
    const [validUpload, setValidUpload] = useState(0);

    const worldInputRef = useRef<HTMLInputElement>(null);
    const screenshotsInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    let buttonText: string;

    let urlString: string;
    let imageClassName: string;
    let statusDivClassNames = 'mb-2 border-4 rounded-xl p-2 max-w-sm';
    let statusDivText = '';

    useEffect(
        () => {
            if (props.isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    );

    if (validUpload == 3) {
        imageClassName = 'relative top-0 left-0 w-full h-full rounded-full object-cover overflow-clip';
        statusDivClassNames += ' opacity-100 border-darkgreen bg-lightgreen/30';
        statusDivText = 'Awesome world! Listing it on the public worlds page soon!';
    } else if (validUpload == 1) {
        imageClassName = 'hidden';
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Please ensure that the file dropboxes and text boxes are nonempty!.';
    } else if (validUpload == 2) {
        imageClassName = 'hidden';
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Encountered an error during file uploading! Please try again later.';
    } else {
        imageClassName = 'hidden';
        statusDivClassNames += ' opacity-0';
        statusDivText = '<br><br>';
    }

    let modal: JSX.Element;

    if (props.isOpen) {
        modal = (
            <div className="duration-100 fixed top-0 left-0 h-screen w-screen bg-white z-50 overflow-y-scroll hide-scrollbar lg:px-24">
                <input
                    type="file"
                    ref={worldInputRef}
                    className="hidden"
                    accept=""
                    onChange={() => { }}
                ></input>
                <input
                    type="file"
                    multiple
                    ref={screenshotsInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={() => { }}
                ></input>
                <div className="absolute top-0 left-0 w-full flex flex-col items-end p-5 gap-y-5">
                    <CloseButton stateChanger={
                        () => {
                            props.stateChanger();
                            setValidUpload(0);
                        }
                    }></CloseButton>
                </div>
                <div className="max-w-screen-xl mx-auto mt-5 flex flex-col gap-y-5">
                    <h2 className="page-title mx-5">Upload Worlds</h2>
                    <p className="mx-5">
                        Choose worlds to upload.
                    </p>
                    <div className="px-5 flex flex-col gap-y-5">
                        <FormInputField
                            fieldName="World Name"
                            type="text"
                            invalidPrompt=""
                            setter={setWorldNameString}
                            isValid={true}
                            value={worldNameString}
                        ></FormInputField>
                        <FormInputField
                            fieldName="World Tags (comma separated)"
                            type="text"
                            invalidPrompt=""
                            setter={setWorldTagString}
                            isValid={true}
                            value={worldTagString}
                        ></FormInputField>
                        <FormInputField
                            fieldName="World Description (short)"
                            type="text"
                            invalidPrompt=""
                            setter={setWorldDescString}
                            isValid={true}
                            value={worldDescString}
                        ></FormInputField>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:place-content-between gap-8">
                        <div className="px-5 w-full sm:w-fit flex flex-col sm:flex-row gap-8 overflow-hidden justify-items-start">
                            <Button
                                text="Choose World"
                                type="redirect"
                                theme="blue"
                                clickHandler={() => handleFileUploadRequest(worldInputRef)}
                            ></Button>

                            <Button
                                text="Add Screenshots"
                                type="redirect"
                                theme="blue"
                                clickHandler={() => handleFileUploadRequest(screenshotsInputRef)}
                            ></Button>
                        </div>
                        <div className="mx-5 sm:w-fit">
                            <Button
                                text="Submit"
                                type="redirect"
                                theme="blue"
                                clickHandler={
                                    () => handleSubmitRequest(
                                        worldInputRef,
                                        screenshotsInputRef,
                                        setValidUpload, worldNameString,
                                        worldTagString, worldDescString, props.userID
                                    )
                                }
                            ></Button>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center px-5">
                        <div className={statusDivClassNames}>
                            <p>{statusDivText}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        modal = <></>;
    }

    return modal;
}