import express from 'express';
import errorHandler from "./middleware/errors.js";
import {notFoundHandler} from "./middleware/notFound.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import referenceRoutes from "./routes/referenceData.js";
import {logger} from "./middleware/logger.js";
import {checkAuth} from "./middleware/checkAuth.js";
const PORT = process.env.PORT || 8000;
const allowedOrigins = [
    "https://nova-store-8p6q2jfjx-tekla-7s-projects.vercel.app",
    "https://nova-store-ptr8wmcxz-tekla-7s-projects.vercel.app",
    "https://nova-store-fzh6wam2m-tekla-7s-projects.vercel.app/",
    "http://localhost:5173"
];

const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(logger);
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/reference-data/' ,referenceRoutes)
app.use(checkAuth)
app.use('/api/users/me', userRoutes)
app.use('/api/order', orderRoutes)
///Error handler
app.use(errorHandler);
app.use(notFoundHandler)

try {
    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
} catch (err) {
    console.log("SERVER CRASH:", err);
}