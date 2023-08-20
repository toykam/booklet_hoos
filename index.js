const express = require('express');
const dotenv = require('dotenv')

dotenv.config();

const { notifyOnOrderRouter } = require('./routes/notify-on-order');

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Booklet Hooks</h1>")
})

app.use(notifyOnOrderRouter)

app.listen("3000", (po) => {
    console.log("listening to port ", po);
})