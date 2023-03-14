const {
  GetAccounts,
  GetAccount,
  GetOwnAccount,
  GetAccountByPhone,
} = require("../controllers/accounts");
const authChecks = require("../middlewares/authCheck");

const router = require("express").Router();

router.get("/all", GetAccounts);
router.get("/myaccount", authChecks, GetOwnAccount);
router.get("/friends/:accountsId", GetAccount);
router.get("/chatting/:phone", GetAccountByPhone);

module.exports = router;
