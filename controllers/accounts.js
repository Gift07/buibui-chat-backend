const Account = require("../models/account");
const Auth = require("../models/auth");

const GetAccounts = async (req, res) => {
  try {
    const data = await Account.find().populate({
      path: "user",
      select: "-_id -password -updatedAt",
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetAccount = async (req, res) => {
  const { accountsId } = req.params;

  try {
    const account = await Account.findById(accountsId).populate({
      path: "user",
      select: "-_id -password -updatedAt",
    });
    if (!account) {
      // if no account is found, return a 404 error
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const GetOwnAccount = async (req, res) => {
  try {
    const { _id } = req.user;

    const data = await Account.findOne({ user: _id }).populate({
      path: "user",
      select: "-_id -password -updatedAt",
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const GetAccountByPhone = async (req, res) => {
  console.log("here");
  try {
    const { phone } = req.params;
    const user = await Auth.findOne({ phone_number: phone });

    const data = await Account.findOne({ user: user._id }).populate({
      path: "user",
      select: "-_id -password -updatedAt",
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { GetAccounts, GetAccount, GetOwnAccount, GetAccountByPhone };
