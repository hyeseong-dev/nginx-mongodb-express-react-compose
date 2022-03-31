require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const ErrorsMiddleware = require("./middleware/errorMiddleware");
const LibraryError = require("./utils/libraryError");

process.on("uncaughtException", (error) => {
    console.log("uncaughtException ....🔥🔥 stopping the server....");
    console.log(error.name, error.message);
    process.exit(1);
});

const app = express();

connectToDB();

app.use(express.json());

const PORT = process.env.PORT || 5050;

app.get("/test", (req, res) => {
    res.json({
        HI: "Welcome to the MERN Library API",
    });
});

// Error middleware 
app.all("*", (req, res, next) => {
    next(
        new LibraryError(
            `4️⃣0️⃣4️⃣Can't find ${req.originalUrl} on this server!`,
            404
        )
    );
});
const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
