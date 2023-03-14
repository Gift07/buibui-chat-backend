const {
  getConversation,
  GetUserConv,
  GetTwoUserConv,
} = require("../controllers/conversation");

const router = require("express").Router();

router.post("/", getConversation);
router.get("/:userId", GetUserConv);
router.get("/find/:firstUserId/:secondUserId", GetTwoUserConv);

module.exports = router;
