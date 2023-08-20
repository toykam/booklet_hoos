const { initializeApp, credential } = require("firebase-admin")

const serviceAccount = require("./service-account.json");
const fcmApp = initializeApp({
    credential: credential.cert(
        serviceAccount
    )
})

const sendPushNotification = ({token, notification, data}) => {
    fcmApp.messaging().send({
        token, notification, data
    }).then((v) => console.log("Push Notification Sent")).catch((e) => console.log("Push Notification Error ::: ", e))
}

module.exports = {sendPushNotification}