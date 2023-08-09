import express from "express";
import cors from 'cors';
import { APP_PORT } from "./config/index.js";
import  { connectDB } from "./database/index.js";
import routes from "./routes/index.js";
import { fileURLToPath } from 'url';
import path from 'path';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/api',routes);


const PORT = process.env.PORT || APP_PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));