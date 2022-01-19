import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
    } catch (error) {
        console.log("Connection Error", (error as Error).message);
    }

    const connection = mongoose.connection;
    if (connection.readyState >= 1) {
        console.log("Connected to mongoDB");
        return;
    }

    connection.on("error", () => console.log("Connection failed"));
};

export default connectMongoDB;