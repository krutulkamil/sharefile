import express from "express";
import multer from "multer";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary"
import File from "../models/File";

const router = express.Router();

const storage = multer.diskStorage({});

let upload = multer({
    storage
})

router.post("/upload", upload.single("myFile"), async (req, res) => {
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

        res.status(200).json(file);

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Server error!"
        });
    }
});

export default router;