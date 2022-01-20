import DropZone from "@components/DropZone";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl font-medium">Got a File? Share it!</h1>
            <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
                <DropZone />
                {/*render file*/}
                {/*upload button*/}
            </div>
        </div>
    );
}
