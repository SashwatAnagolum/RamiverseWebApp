import FormInputField from "@/components/FormInputField/FormInputField";

export default function Register() {
    return (
        <div className="m-5">
            <div className="w-full flex flex-row justify-around mb-5">
                <h2 className="page-title">Join the Ramiverse</h2>
            </div>
            <div className="w-full flex flex-col gap-5">
                <FormInputField fieldName="Username" type="text" validator="username"></FormInputField>
                <FormInputField fieldName="Password" type="password" validator="password"></FormInputField>
            </div>
        </div>
    );
}