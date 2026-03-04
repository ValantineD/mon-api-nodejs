require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)
    .then (_result => {
        console.log("connected to MongoDB");
    })
    .catch(err => console.error(err));

const indexRouter = require("./routes/index");
const AuthRouter = require("./routes/auth");

app.use(express.json());

app.use("/api", indexRouter);
app.use("/api/auth", AuthRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
