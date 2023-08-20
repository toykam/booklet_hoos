const { initializeApp, credential } = require("firebase-admin")

const serviceAccount = require("./service-account.json");
const fcmApp = initializeApp({
    credential: credential.cert(
        serviceAccount
    )
})

module.exports = {fcmApp}