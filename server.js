const express = require("express");
const app = express();
const StreamChat = require("stream-chat").StreamChat;
require("dotenv").config();

var apiKey = process.env.API_KEY;
var apiSecret = process.env.API_SECRET;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const serverClient = new StreamChat(
  apiKey,
  apiSecret
);

app.get("/token", (req, res) => {
  const { username } = req.query;

  if (username) {
    const token = serverClient.createToken(username);
    res.status(200).json({ token, status: "sucess" });
  } else {
    res.status(401).json({ message: "invalid request", status: "error" });
  }
});

app.post("/updateUser", async (req, res) => {
  const { userID } = req.body;

  if (userID) {
    const updateResponse = await serverClient.updateUsers([
      {
        id: userID,
        role: "admin",
      },
    ]);

    res.status(200).json({ user: updateResponse, status: "success" });
  } else {
    res.status(401).json({ message: "invalid request", status: "error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.listen(8800, () => {
  console.log("Example app listening on port 8800!");
});
