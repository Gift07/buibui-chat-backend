const mongoose = require("mongoose");
const Account = require("./account");

// creating a model
const authSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
// middleware fucntion to create new accout whenever auth document is created
authSchema.pre("save", async function (next) {
  // check is auth document is new
  if (this.isNew) {
    const account = new Account({
      user: this.id,
      thumbnail:
        "https://r.search.yahoo.com/_ylt=AwrNOgpI5Q1k0W8BxZpNBQx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzMyOTc3MzBlYTQxODQ1NDEwMjExZTA4M2JjYzIzMzZiBGdwb3MDNQRpdANiaW5n/RV=2/RE=1678661065/RO=11/RU=https%3a%2f%2fshreesaibabaheartinstitute.com%2four-administration.php/RK=2/RS=Ca2SP6RjXg.sTLS1PCq_a94YQP8-",
    });
    // saving the account
    await account.save();
  }
});

module.exports = mongoose.model("auth", authSchema);
