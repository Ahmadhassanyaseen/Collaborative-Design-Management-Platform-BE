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
// const corsInstance = cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://collaborative-design-ma-git-f9e884-ah9426338-gmailcoms-projects.vercel.app",
//     "https://collaborative-design-management-platform-5q8yn2g1h.vercel.app",
//     "https://collaborative-design-ma-git-0c157c-ah9426338-gmailcoms-projects.vercel.app"
//   ],
//   credentials: true,
// });
const corsInstance = cors({
  origin: (origin, callback) => {
    if (!origin) {
      // Allow requests with no origin (like mobile apps or Postman)
      callback(null, true);
    } else {
      // Allow any origin
      callback(null, true);
    }
  },
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
});
app.use(corsInstance);

app.use("/api", AllRouter);

const start = async () => {
  try {
    await DBConnect(); // Ensure DBConnect is awaited if it returns a Promise
    const host = "localhost"; // Replace with your server's hostname or IP address
    const protocol = "http"; // Adjust to 'https' if you're using HTTPS

    app.listen(port, () => {
      console.log(`Server started at ${protocol}://${host}:${port}`);
    });
  } catch (error) {
    console.error("Error while starting app: " + error);
  }
};


start();