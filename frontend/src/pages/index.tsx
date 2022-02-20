// react
import {useState} from 'react';
// next
import {NextPage} from "next";
// axios
import axios from 'axios';
// components
import DropZone from "@components/DropZone";
import RenderFile from "@components/RenderFile";
import DownloadFile from "@components/DownloadFile";
import EmailForm from "@components/EmailForm";

const Home: NextPage = (): JSX.Element => {
    const [file, setFile] = useState(null);
    const [id, setId] = useState(null);
    const [downloadPageLink, setDownloadPageLink] = useState<string | null>(null);
    const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload")

    const handleUpload = async (): Promise<void> => {
        if (uploadState === "Uploading") return;
        setUploadState("Uploading");
        const formData = new FormData();
        formData.append("myFile", file);
        try {
            const {data} = await axios({
                method: "POST",
                data: formData,
                url: "api/files/upload",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setDownloadPageLink(data.downloadPageLink);
            setId(data.id);
        } catch (error) {
            console.log(error.response.data);
            setUploadState("Upload Failed");
        }
    };

    const resetComponent = (): void => {
        setFile(null);
        setDownloadPageLink(null);
        setUploadState("Upload");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl font-medium">Got a File? Share it!</h1>
            <div className="w-80 sm:w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">

                {!downloadPageLink && <DropZone setFile={setFile}/>}

                {file && (
                    <RenderFile file={{
                        format: file.path.split(".")[1],
                        name: file.name,
                        sizeInBytes: file.size
                    }}
                    />
                )}

                {!downloadPageLink && file && (
                        <button
                            className="button"
                            onClick={handleUpload}
                        >
                            {uploadState}
                        </button>)
                }

                {downloadPageLink && (
                    <div className="p-2 text-center">
                        <DownloadFile downloadPageLink={downloadPageLink}/>
                        <EmailForm id={id}/>
                        <button
                            className="button"
                            onClick={resetComponent}
                        >
                            Upload New File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
