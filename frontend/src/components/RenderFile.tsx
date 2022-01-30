// react
import {FunctionComponent} from "react";
// helper functions
import {smartTrim} from "../../libs/smartTrim";
import {sizeInMb} from "../../libs/sizeInMb";
// types
import { IFile } from 'libs/types'

interface Props {
    file: IFile
}

const RenderFile: FunctionComponent<Props> = ({file: {format, sizeInBytes, name}}): JSX.Element => {
    return (
        <div className="flex items-center w-full p-4 my-2">
            <img src={`/images/${format}.png`} alt={name} className="w-14 h-14 pointer-events-none"/>
            <span className="mx-2">{smartTrim(name, 20, " ", "(...)")}</span>
            <span className="ml-auto">{sizeInMb(sizeInBytes)}</span>
        </div>
    );
};

export default RenderFile;
