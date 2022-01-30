export interface IFile {
    name: string,
    sizeInBytes: number,
    format: string,
    id?: string
}

export interface IFileUpload {
    path: string;
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}