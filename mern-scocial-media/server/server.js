import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';

/*CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

//middleware config
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/**FILE STG CONFIG */
const storage = multer.diskStorage({
    destination:function (req, file, cb){
        cb(null, "public/assets");
    },
    filename:function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer ({ storage });

/**ROUTES */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

/**ROUTES WITH FILES (images) */
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', upload.single("picture"), verifyToken, createPost);

/**MONGOOSE SETUP */
const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server started on port ${PORT}`)
    });
}).catch((error)=>{
    console.log(`${error} Did not connect!`)
});
