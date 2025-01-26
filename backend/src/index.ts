import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import {errorHandler} from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsers and content type
app.use(express.json());
app.use(cookieParser());

// Mount all routes
app.use("", routes);

// Error handling middleware must be after all routes
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
