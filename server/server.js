const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config({
    path: "./config.env"
});

const port = process.env.PORT;
const dbo = require("./db/conn");

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

app.listen(port, () => {

    dbo.connectToServer((error) => {

        if (error) console.error;
    });

    console.log(`server running on port: ${port}`);
});

