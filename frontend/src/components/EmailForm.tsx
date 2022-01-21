import {FunctionComponent, useState} from "react";

const EmailForm: FunctionComponent<{
    id: string
}> = ({id}) => {
    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [message, setMessage] = useState(null);

    return (
        <div className="form">
            <h3>You can also send a file through mail</h3>
            <form className="form">
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
        </div>
    );
};

export default EmailForm;
