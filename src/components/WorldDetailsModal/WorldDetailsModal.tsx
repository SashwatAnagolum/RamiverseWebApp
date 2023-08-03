type WorldDetailsProps = {
    isOpen: boolean;
    worldShortDesc: string;
    worldID: string;
    stateChanger: () => void;
}

export default function WorldDetailsModal(props: WorldDetailsProps) {
    let modalElement: JSX.Element;

    if (props.isOpen) {
        modalElement = (
            <div className="duration-100 fixed top-0 left-0 h-screen w-screen bg-lightblue z-50">
            </div>
        )
    } else {
        modalElement = <></>;
    }

    return modalElement;
}