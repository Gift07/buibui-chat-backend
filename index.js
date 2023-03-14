const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// importing routing paths
const AuthRoutes = require("./routes/auth");
const ConvoRoutes = require("./routes/conversation");
const AccountRoutes = require("./routes/account");
const MessageRoutes = require("./routes/messages");

const app = express();

// creating middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(), express.json());

app.get("/", (req, res) => {
  res.send("buibui chat api");
});

// my routes
app.use("/api/auth", AuthRoutes);
app.use("/api/conversation", ConvoRoutes);
app.use("/api/accounts", AccountRoutes);
app.use("/api/messages", MessageRoutes);

// connection to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port 8800...`);
    });
  })
  .catch((error) => console.log(error));
