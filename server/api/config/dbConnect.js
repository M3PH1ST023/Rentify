import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL + process.env.MONGO_DB);

const database = mongoose.connection;

database.on("connected", () => {
    console.log(`Connected to database ...`);
});

database.on("error", (err) => {
    console.log(err);
});

export default database;
