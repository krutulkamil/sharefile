import { IFile } from 'libs/types'
import {FunctionComponent} from "react";
import {smartTrim} from "../../libs/smartTrim";
import {sizeInMb} from "../../libs/sizeInMb";

const RenderFile: FunctionComponent<{file: IFile}>= ({file: {format, sizeInBytes, name}}) => {
    return (
        <div className="flex items-center w-full p-4 my-2">
            <img src={`/images/${format}.png`} alt={name} className="w-14 h-14"/>
            <span className="mx-2">{smartTrim(name, 20, " ", "(...)")}</span>
            <span className="ml-auto">{sizeInMb(sizeInBytes)}</span>
        </div>
    );
};

export default RenderFile;
