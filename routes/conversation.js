const {
  getConversation,
  GetUserConv,
  GetTwoUserConv,
} = require("../controllers/conversation");

const router = require("express").Router();

router.post("/addnew", getConversation);
router.get("/:userId", GetUserConv);
router.get("/find/:firstUserId/:secondUserId", GetTwoUserConv);

module.exports = router;
