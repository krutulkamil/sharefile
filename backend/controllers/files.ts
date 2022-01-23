import {Request, Response} from "express";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import https from "https";
import nodemailer from "nodemailer";
import File from "../models/File";
import createEmailTemplate from "../utils/createEmailTemplate";

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Hey bro! We need that file!"
            })
        }

        let uploadedFile: UploadApiResponse;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "ShareFile",
                resource_type: "auto"
            });

        } catch (error) {
            console.log((error as Error).message);

            return res.status(400).json({
                message: "Cloudinary Error"
            });
        }

        const {originalname} = req.file;
        const {secure_url, bytes, format} = uploadedFile;

        const file = await File.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format
        })

        res.status(200).json({
            id: file._id,
            downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`
        });

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Server error!"
        });
    }
}

export const getFile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({
                message: "File does not exist"
            })
        }

        const {filename, format, sizeInBytes} = file;

        return res.status(200).json({
            name: filename,
            sizeInBytes,
            format,
            id
        });

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const downloadFile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({
                message: "File does not exist"
            })
        }

        // get file -> and download
        https.get(file.secure_url, (fileStream) => fileStream.pipe(res));


    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const sendFile = async (req: Request, res: Response) => {
    const {id, emailFrom, emailTo} = req.body;

    const file = await File.findById(id);
    if (!file) {
        return res.status(404).json({
            message: "File does not exist"
        })
    }

    let transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.SENDINBLUE_SMTP_HOST!,
        port: process.env.SENDINBLUE_SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SENDINBLUE_SMTP_USER,
            pass: process.env.SENDINBLUE_SMTP_PASSWORD,
        },
    });

    const {filename, sizeInBytes} = file;

    const fileSize = `${(Number(sizeInBytes) / (1024*1024)).toFixed(2)} MB`;
    const downloadPageLink = `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`;

    const mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: "File shared with you",
        text: `${emailFrom} send you a file!`,
        html: createEmailTemplate(emailFrom, downloadPageLink, filename, fileSize)
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Server Error"
            });
        }

        file.sender = emailFrom;
        file.receiver = emailTo;

        await file.save();
        return res.status(200).json({
            message: "Email Sent"
        });
    });
}