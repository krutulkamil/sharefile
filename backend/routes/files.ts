import express from "express";
import multer from "multer";

import {uploadFile, getFile, downloadFile, sendFile} from "../controllers/files";
const router = express.Router();

// multer settings
const storage = multer.diskStorage({});
let upload = multer({
    storage
});

router.post("/upload", upload.single("myFile"), uploadFile);
router.get("/:id", getFile);
router.get("/:id/download", downloadFile);
router.post('/email', sendFile);

export default router;