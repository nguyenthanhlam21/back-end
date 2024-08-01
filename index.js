import express from "express";
import cors from "cors";
import connectMongoDB from "./src/config/dbconfig.js";
import router from "./src/routes/index.js";

const app = express();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL || "mongodb+srv://lamn47593:n9e4uF8xW6Pa4dj8@cluster0.kafkaut.mongodb.net/Xuong_react";

connectMongoDB(dbUrl);

app.use("/", router);
app.listen(port, () => console.log("Server is running with " + port));
// export const viteNodeApp = app;
