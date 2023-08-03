import FormInputField from "@/components/FormInputField/FormInputField";

export default function Login() {
    return (
        <div className="m-5">
            <div className="w-full flex flex-row justify-around mb-5">
                <h2 className="page-title">Enter the Ramiverse</h2>
            </div>
            <div className="w-full flex flex-col gap-5">
                <FormInputField fieldName="Username" type="text" validator=""></FormInputField>
                <FormInputField fieldName="Password" type="password" validator=""></FormInputField>
            </div>
        </div>
    );
}