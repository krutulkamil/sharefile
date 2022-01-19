import "tailwindcss/tailwind.css";
import "../../styles/globals.css";

function MyApp({Component, pageProps}) {
    return <div className="h-screen font-serif bg-gray-900">
        <Component {...pageProps} />;
    </div>
}

export default MyApp;
