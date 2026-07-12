import express from 'express';
import errorHandler from "./middleware/errors.js";
import {notFoundHandler} from "./middleware/notFound.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import referenceRoutes from "./routes/referenceData.js";
import {logger} from "./middleware/logger.js";
import {checkAuth} from "./middleware/checkAuth.js";

const app = express();
import cors from "cors";
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(logger);
app.use(express.json())
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
    app.listen(8000, () => {
        console.log("Server started on port 8000");
    });
} catch (err) {
    console.log("SERVER CRASH:", err);
}