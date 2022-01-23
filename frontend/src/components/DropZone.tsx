import {useCallback, FunctionComponent, Dispatch} from 'react';
import {useDropzone} from 'react-dropzone';

const DropZone: FunctionComponent<{ setFile: Dispatch<any> }> = ({setFile}) => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    }, []);

    const MAX_SIZE = 10485760; // 10mb max size

    const {getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone({
        onDrop,
        multiple: false,
        accept: "image/jpg, image/jpeg, image/bmp, image/png, image/gif, application/pdf, audio/mpeg",
        maxSize: MAX_SIZE
    });

    return (
        <div className="p-4 w-full">
            <div {...getRootProps()} className="h-80 w-full rounded-md cursor-pointer focus:outline-none">
                <input {...getInputProps()} />

                <div
                    className={"flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl h-full space-y-3 "
                        + (isDragReject === true ? "border-red-500" : "")
                        + (isDragAccept === true ? "border-green-500" : "")
                    }
                >
                    <img src="folder.png" alt="folder" className="h-16 w-16 pointer-events-none"/>
                    {isDragReject ? (
                        <p>Sorry, we aren't supporting this file</p>
                    ) : (
                        <>
                            <p>Drag & Drop Files Here</p>
                            <p className="mt-2 text-base text-gray-300">Images, pdf and mp3 files supported</p>
                            <p className="mt-2 text-base text-gray-400">Max size: 10mb</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DropZone;
