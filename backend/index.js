import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./model/bookModel.js";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing req body
//app.use() used to Mounts the middleware function 
app.use(express.json())

//Middleware for handling CORS POLICY
app.use(cors());
//second way of handling CORS POLICY
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders : ['Content-type'],
// }))

//this method is use to request the data specific
app.get("/", (req, res) => {
  res.send("Welcome");
});

//we initially code the route but they are now in Routes folder
//now use that route as a middleware

app.use('/books', bookRoute)


//connect to database we use mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
