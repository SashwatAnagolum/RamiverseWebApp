type CloseButtonProps = {
    stateChanger: () => void;
}

export default function CloseButton(props: CloseButtonProps) {
    return (
        <div
            className="rounded-full h-9 w-9 bg-midnightblue cursor-pointer"
            onClick={
                (e) => {
                    e.stopPropagation();
                    props.stateChanger();
                }
            }
        >
            <div className="h-1 w-5 rotate-45 bg-white translate-y-4 translate-x-2"></div>
            <div className="h-1 w-5 -rotate-45 bg-white translate-y-3 translate-x-2"></div>
        </div>
    );
}