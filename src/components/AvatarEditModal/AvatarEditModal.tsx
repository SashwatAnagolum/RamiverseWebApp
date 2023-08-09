'use client'

import fetchWithTimeout from "@/app/api/utils";
import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton";

import { RefObject, useEffect, useRef, useState } from "react";

type AvatarEditModalProps = {
    isOpen: boolean;
    stateChanger: () => void;
}

function handleAvatarChangeRequest(inputRef: RefObject<HTMLInputElement>) {
    if (inputRef.current) {
        inputRef.current.click();
    }
}

async function uploadImage(inputRef: RefObject<HTMLInputElement>,
    setValidUpload: (num: number) => void) {
    if (inputRef.current && inputRef.current.files) {
        const data = await fetchWithTimeout(
            './api/presigned',
            {
                headers: {
                    'request-type': 'put',
                    'filename': 'user-avatar'
                }
            }
        );

        const signedURL = await data.body?.getReader().read().then(
            (resp) => new TextDecoder().decode(resp.value)
        );

        if (signedURL) {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', signedURL);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    setValidUpload(2);
                }
            }

            xhr.send(inputRef.current.files[0]);
        } else {
            setValidUpload(3);
        }
    } else {
        setValidUpload(3);
    }
}

function handleFileSelection(inputRef: RefObject<HTMLInputElement>,
    imageRef: RefObject<HTMLImageElement>,
    setValidUpload: (valid: number) => void,
    setURLString: (str: string) => void) {
    if (
        inputRef.current &&
        imageRef.current &&
        inputRef.current.files &&
        inputRef.current.files.length &&
        inputRef.current.files[0].type.includes('image')
    ) {
        let imageURL = window.URL.createObjectURL(inputRef.current.files[0]);
        setURLString(imageURL);
        imageRef.current.src = imageURL;
    } else {
        setValidUpload(1);
    }
}

function handleImageLoad(imageRef: RefObject<HTMLImageElement>,
    setValidUpload: (valid: number) => void, getURLString: () => string,
    inputRef: RefObject<HTMLInputElement>) {
    if (imageRef.current) {
        if (
            (imageRef.current.naturalWidth < 300) ||
            (imageRef.current.naturalHeight < 300)
        ) {
            window.URL.revokeObjectURL(getURLString());
            setValidUpload(1);
        } else {
            uploadImage(inputRef, setValidUpload);
        }
    }
}

export default function AvatarEditModal(props: AvatarEditModalProps) {
    const [validUpload, setValidUpload] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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

    function setURL(str: string) {
        urlString = str;
    }

    function getURL() {
        return urlString;
    }

    if (validUpload == 2) {
        imageClassName = 'relative top-0 left-0 w-full h-full rounded-full object-cover overflow-clip';
        statusDivClassNames += ' opacity-100 border-darkgreen bg-lightgreen/30';
        statusDivText = 'Cool choice! Updating your avatar now.';
    } else if (validUpload == 1) {
        imageClassName = 'hidden';
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Please ensure that the chosen file is an image and is big enough!.';
    } else if (validUpload == 3) {
        imageClassName = 'hidden';
        statusDivClassNames += ' opacity-100 border-darkred bg-lightred/30';
        statusDivText = 'Encountered an error during image upload! Please try again later.';
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
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={() => handleFileSelection(fileInputRef, imageRef, setValidUpload, setURL)}
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
                    <h2 className="page-title mx-5">Edit Avatar</h2>
                    <p className="mx-5">
                        Choose an image to set as your new avatar. The image must be atleast 300 x 300 pixels.
                    </p>
                    <div className="px-5 w-full sm:w-max">
                        <Button
                            text="Choose image"
                            type="redirect"
                            theme="blue"
                            clickHandler={() => handleAvatarChangeRequest(fileInputRef)}
                        ></Button>
                    </div>
                    <div className="w-full flex flex-col items-center px-5">
                        <div className={statusDivClassNames}>
                            <p>{statusDivText}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col m-5 items-center">
                    <div className="w-64 h-64">
                        <img
                            ref={imageRef}
                            className={imageClassName}
                            fetchPriority="high"
                            onLoad={() => handleImageLoad(imageRef, setValidUpload, getURL, fileInputRef)}
                        ></img>
                    </div>
                </div>
            </div>
        )
    } else {
        modal = <></>;
    }

    return modal;
}