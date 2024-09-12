process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error:', err.message);
    console.error(err.stack);
    process.exit(1); 
});

import express from 'express';
import userRouter from './routes/user.js';
import bookRouter from './routes/book.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectMongo } from './connection.js';

//Connect to DB
connectMongo();

const app = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(bookRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
});

//ErrorHandler
app.use(errorHandler);
