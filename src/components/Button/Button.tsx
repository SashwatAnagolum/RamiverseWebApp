type ButtonProps = {
    text: string
    type: string
    theme: string
}

export default function Button(props: ButtonProps) {
    let buttonStyles: string;
    buttonStyles = "px-5 py-2 rounded-md";

    if (props.theme === "blue") {
        buttonStyles += " text-white bg-midnightblue hover:bg-darkblue";
    } else if (props.theme === "gray") {
        buttonStyles += " text-black bg-white hover:bg-lightgrey";
    }

    return (
        <div>
            <button className={buttonStyles}>
                {props.text}
            </button>
        </div>
    )
}