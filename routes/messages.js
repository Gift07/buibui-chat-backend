const { CreateMessage, GetMessages } = require("../controllers/messages");

const router = require("express").Router();

router.post("/create", CreateMessage);
router.get("/available/:conversationId", GetMessages);

module.exports = router;
