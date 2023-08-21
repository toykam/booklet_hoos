const { Router } = require("express");
const { supabaseAdminClient } = require("../database/supabase/admin.supabase.client");
const { sendPushNotification } = require("../fcm/fcm");

const notifyOnOrderRouter = Router()


notifyOnOrderRouter.get("/notify-on-order", async (req, res) => {
    // const users = await supabaseAdminClient.from("users").select("*");
    // sendPushNotification({
    //     token: "cdJZ3RLuSm-b3tNM2EWfOs:APA91bF-kdU1No6507S4szfhG6atitBGyhR-EVO9x-oz5zpDT2LUJmgGVC92Al1wbYT4C_6L9pPr-rmfT584ImhGOFR2kneXRFRnlpUnCMaN40ne0lUgoU11kX4v3ld6Z1JHjC80KAwb",
    //     notification: {
    //         "title": "Test Notification",
    //         "body": "Notification Body"
    //     }
    // })
    res.send({"message": "Users ::: "})
})

notifyOnOrderRouter.post("/notify-on-order", async (req, res) => {
    try {
        // console.log("SendData ::: ", req.body);
        const {
            type, record,
        } = req.body;
        const {
            status, cook, waiter, customer_name, table_name, decline_message, id
        } = record

        const cookResponse = await supabaseAdminClient.from("users").select("*").eq("user_id", cook).single();
        const waiterResponse = await supabaseAdminClient.from("users").select("*").eq("user_id", waiter).single();

        const cookDetail = cookResponse.data;
        const waiterDetail = waiterResponse.data;

        // console.log(cookDetail, waiterDetail);

        let token = "";
        let message = "";

        if (type == "INSERT") {
            token = cookDetail['push_notification_token'];
            message = "You have have a new order, click to view detail.";
        } else if (type == "UPDATE") {
            if (status == "Declined") {
                token = waiterDetail['push_notification_token'];
                message = `The order for ${customer_name} in ${table_name} have been declined because ${decline_message}`
            }
            if (status == "Ready") {
                token = waiterDetail['push_notification_token'];
                message = `The order for ${customer_name} in ${table_name} is ready for pickup.`
            }
            if (status == "Accepted") {
                token = waiterDetail['push_notification_token'];
                message = `The order for ${customer_name} in ${table_name} have been accepted.`
            }
            if (status == "Preparing") {
                token = waiterDetail['push_notification_token'];
                message = `The order for ${customer_name} in ${table_name} preparation have started.`
            }
            if (status == "Cancelled") {
                token = cookDetail['push_notification_token'];
                message = `The order for ${customer_name} in ${table_name} preparation have cancelled.`
            }
            // if (status == "Preparing") {
            //     token = waiterDetail['push_notification_token'];
            //     message = `The order for ${customer_name} in ${table_name} preparation have started.`
            // }
        }

        if (token.length != 0) {
            sendPushNotification({
                token, 
                notification: {
                    "title": "Order Update",
                    "body": message
                },
                data: JSON.stringify({
                    "order_id": id
                })
            })
        }
        return res.send({
            "message": "All done"
        })
    } catch (error) {
        console.log("Error :: ", error);
        return res.status(500).send("Error: ", error)
    }
})

module.exports = {
    notifyOnOrderRouter
}