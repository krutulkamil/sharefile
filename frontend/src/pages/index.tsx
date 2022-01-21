import {useState} from 'react';
import DropZone from "@components/DropZone";
import RenderFile from "@components/RenderFile";

export default function Home() {
    const [file, setFile] = useState(null);
    console.log({file});

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl font-medium">Got a File? Share it!</h1>
            <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
                <DropZone setFile={setFile}/>

                {file && (
                    <RenderFile file={{
                        format: file.path.split(".")[1],
                        name: file.name,
                        sizeInBytes: file.size
                    }}
                    />
                )}

                {/*upload button*/}
            </div>
        </div>
    );
}
