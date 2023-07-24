const express = require("express")
// const router = require("./userRoute")
const { createChat, findUserChat, findChat } = require("../Controllers/chatController")

const router = express.Router();

router.post("/", createChat)
router.get("/:userId", findUserChat)
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;

