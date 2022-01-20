import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

const DropZone = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div>
            <div {...getRootProps()} className="h-80 w-full">
                <input {...getInputProps()} />
                <p>Drag & Drop Files Here</p>
            </div>
        </div>
    );
};

export default DropZone;
