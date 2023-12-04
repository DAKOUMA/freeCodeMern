import express, { response } from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { PORT, mongoDBURL } from "./config.js" ;
import { Book } from "./models/bookModel.js";

import booksRoutes from "./routes/booksRoutes.js"

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-type']
//    })
//)

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial')
});

// Inject the booksRoutes
app.use("/books", booksRoutes)


// Connect to mongoose
mongoose
    .connect(mongoDBURL)
    .then((result) => {
        console.log('App connect to database.');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}.`);
        });
    }).catch((error) => {
        console.error(error);
    });