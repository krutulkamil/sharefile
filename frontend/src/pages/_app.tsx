import axios from "axios";
import "tailwindcss/tailwind.css";
import "../../styles/globals.css";
import {AppProps} from "next/app";
import {NextPage} from "next";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER

const MyApp: NextPage<AppProps> = ({Component, pageProps}: AppProps) => {
    return (
        <div className="h-screen font-sans bg-gradient-to-b from-gray-900 to-gray-800 text-white grid place-items-center">
            <div>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp;
