import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./api/v1/routers/UserRoute.js";
import database from "./api/config/dbConnect.js";
import PropertyRouter from "./api/v1/routers/PropertyRouter.js";
import FilterRouter from "./api/v1/routers/FilterRouter.js";

const app = express();
const port = 5000;
dotenv.config();

app.use(express.json());
app.use(
    cors({
        origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    })
);

app.get("/", (req, res) => {
    res.json("Api for Rentify");
});
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/property", PropertyRouter);
app.use("/api/v1/filters", FilterRouter);

app.listen(port, () => {
    console.log(`Server running on ${port} ...`);
});
