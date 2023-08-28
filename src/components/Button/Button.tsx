'use client'

type ButtonProps = {
    text: string;
    type: string;
    theme: string;
    clickHandler: (() => void) | null;
}

export default function Button(props: ButtonProps) {
    let buttonStyles: string;
    buttonStyles = "px-5 py-2 rounded-md w-full sm:min-w-max";
    let clickHandler: () => void;

    if (!props.clickHandler) {
        clickHandler = () => { };
    } else {
        clickHandler = props.clickHandler;
    }

    if (props.theme === "blue") {
        buttonStyles += " text-white bg-midnightblue hover:bg-darkblue";
    } else if (props.theme === "gray") {
        buttonStyles += " text-black bg-white hover:bg-lightgrey";
    }

    return (
        <div className="w-full flex flex-col items-stretch">
            <button className={buttonStyles} onClick={clickHandler}>
                {props.text}
            </button>
        </div>
    )
}