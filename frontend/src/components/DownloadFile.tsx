import {FunctionComponent} from "react";

interface Props {
    downloadPageLink: string
}

const DownloadFile: FunctionComponent<Props> = ({downloadPageLink}) => {
    return (
        <div className="p-1">
            <h1 className="my-2 text-lg font-medium">Your file is successfully uploaded!</h1>
            <div className="flex space-x-3">
                <span className="break-all text-blue-300 hover:text-blue-400 my-2">{downloadPageLink}</span>
                <img
                    src="copy.png"
                    alt="copy file"
                    className="w-8 h-8 object-contain cursor-pointer"
                    onClick={() => navigator.clipboard.writeText(downloadPageLink)}
                />
            </div>
        </div>
    );
};

export default DownloadFile;
