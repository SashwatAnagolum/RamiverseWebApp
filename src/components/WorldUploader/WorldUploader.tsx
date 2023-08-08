'use client'

import Button from "../Button/Button";

export default function WorldUploader() {
    return (
        <div className="w-full flex flex-col items-center gap-y-2 md:py-5 md:items-start">
            <p>Ready to share another world with everyone?</p>
            <div className="w-full sm:w-max">
                <Button text="Upload World" theme="blue" type="submit" clickHandler={() => { }}></Button>
            </div>
        </div>
    );
}