import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT

app.listen(PORT || 8000, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
});