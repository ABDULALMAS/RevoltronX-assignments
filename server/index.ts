import express, {Application, Request, Response} from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import articleRoutes from './routes/article.ts'
import bookMarkRoutes from './routes/bookMarks.ts'

import userRoutes from "./routes/users.ts";
import profileRoutes from "./routes/profile.ts";


import dotenv from "dotenv";


const app : Application= express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb"}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/articles", articleRoutes);
app.use("/bookmarks", bookMarkRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);

const PORT: number | string = process.env.PORT || 5000;

app.get("/", (req: Request,res: Response) => {
  res.send("Server is running !")
})

const connectionUrl: string | undefined = process.env.CONNECTION_URL;


if (connectionUrl){

  mongoose
    .connect(connectionUrl)
    .then(() =>
      app.listen(PORT , () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));
  } else {
    console.error("Connection URL is not defined in the environment variables.");
   
  }
      
      