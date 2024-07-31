import express from "express";
import cors from "cors";
import connectMongoDB from "./config/dbconfig";
import router from "./routes";

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const dbUrl = process.env.DB_URI || "mongodb+srv://lamn47593:n9e4uF8xW6Pa4dj8@cluster0.kafkaut.mongodb.net/Xuong_react";

connectMongoDB(dbUrl);

app.use("/", router);

export const viteNodeApp = app;
