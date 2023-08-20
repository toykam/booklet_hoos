const { Router } = require("express");

const notifyOnOrderRouter = Router()


notifyOnOrderRouter.get("/notify-on-order", (req, res) => {
    res.send("<h1>I will notify you on order</h1>")
})

notifyOnOrderRouter.post("/notify-on-order", (req, res) => {
    try {
        const {
            type, record,
        } = req.body;
        const {
            status, cook, waiter
        } = record

        if (type == "INSERT") {

        } else if (type == "UPDATE") {
            
        }
    } catch (error) {
        res.status(500).send("Error: ", error)
    }
})

module.exports = {
    notifyOnOrderRouter
}