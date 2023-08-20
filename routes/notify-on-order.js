const { Router } = require("express");
const { supabaseAdminClient } = require("../database/supabase/admin.supabase.client");

const notifyOnOrderRouter = Router()


notifyOnOrderRouter.get("/notify-on-order", async (req, res) => {
    const users = await supabaseAdminClient.from("users").select("*");
    res.send({"message": "Users ::: ", users})
})

notifyOnOrderRouter.post("/notify-on-order", async (req, res) => {
    try {
        const {
            type, record,
        } = req.body;
        const {
            status, cook, waiter
        } = record

        const cookDetail = await supabaseAdminClient.from("users").select("*").eq("user_id", cook);
        const waiterDetail = await supabaseAdminClient.from("users").select("*").eq("user_id", waiter);

        console.log(cookDetail, waiterDetail);

        if (type == "INSERT") {

        } else if (type == "UPDATE") {
            
        }
        res.send({
            "message": "Al done"
        })
    } catch (error) {
        res.status(500).send("Error: ", error)
    }
})

module.exports = {
    notifyOnOrderRouter
}