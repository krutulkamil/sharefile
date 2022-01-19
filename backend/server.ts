import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary"
import connectMongoDB from "./config/db";
import fileRoutes from "./routes/files"

const app = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api/files", fileRoutes)

const PORT = process.env.PORT

app.listen(PORT || 8000, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
});