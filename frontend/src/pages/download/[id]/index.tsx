import {GetServerSidePropsContext, NextPage} from "next";
import RenderFile from "@components/RenderFile";
import { IFile } from "libs/types";
import axios from "axios";
import fileDownload from "js-file-download";

const DownloadPage: NextPage<{
    file: IFile;
}> = ({file: {format, name, sizeInBytes, id}}) => {

    const handleDownload = async () => {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}api/files/${id}/download`, {
            responseType: "blob"
        });

        fileDownload(data, name);
    };

    return (
        <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">

            {!id ? (
                <span>Ooops! File doesn't exist! Check the URL</span>
            ) : (
                <>
                    <img
                        src="/images/file-download.png"
                        alt="File Download"
                        className="w-16 h-16"
                    />
                    <h1 className="text-xl">You file is ready to be downloaded</h1>
                    <RenderFile file={{format, name, sizeInBytes}} />
                    <button className="button" onClick={handleDownload}>Download</button>
                </>
            )}

        </div>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    let file;

    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}api/files/${id}`);
        file = data;

    } catch (error) {
        console.log(error.response.data);
        file = {};
    }

    return {
        props: {
            file
        }
    }
}

export default DownloadPage;
