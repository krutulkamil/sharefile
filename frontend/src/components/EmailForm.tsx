import {FormEvent, FormEventHandler, FunctionComponent, SyntheticEvent, useState} from "react";
import axios from "axios";

const EmailForm: FunctionComponent<{
    id: string
}> = ({id}) => {
    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [message, setMessage] = useState(null);

    const handleEmail: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const {data} = await axios({
                method: "POST",
                url: "api/files/email",
                data: {
                    id,
                    emailFrom,
                    emailTo
                }
            });

            setMessage(data.message);
        } catch (error) {
            setMessage(error.data.response.message);
        }
    };

    return (
        <div className="form">
            <h3 className="text-green-300">You can also send a file through mail</h3>
            <form className="form" onSubmit={handleEmail}>
                <input
                    className="form-input"
                    type="email"
                    placeholder="Email From"
                    required
                    onChange={e => setEmailFrom(e.target.value)}
                    value={emailFrom}
                />
                <input
                    className="form-input"
                    type="email"
                    placeholder="Email To"
                    required
                    onChange={e => setEmailTo(e.target.value)}
                    value={emailTo}
                />
                <button
                    className="button"
                    type="submit"
                >
                    Send Email
                </button>
            </form>
            {message && (
                <p className="font-medium text-green-500">{message}</p>
            )}
        </div>
    );
};

export default EmailForm;
