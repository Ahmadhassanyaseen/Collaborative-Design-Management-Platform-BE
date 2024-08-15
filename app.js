import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import DBConnect from "./DB/dbConfig.js";
import AllRouter from "./Router/AllRouter.js";
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsInstance = cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
});
app.use(corsInstance);

app.use("/api", AllRouter);

const start = async()=>{
    try {
        DBConnect();
        app.listen(port , ()=>{
            console.log(`Starting on port ${port}`);
        });
        
    } catch (error) {
        console.error("Error While Starting app "+error);
    }
}

start();