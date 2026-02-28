import express from "express";
import { Client, middleware } from "@line/bot-sdk";

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

app.post(
  "/callback",
  middleware(config),
  async (req, res) => {
    try {
      const events = req.body.events;
      await Promise.all(events.map(handleEvent));
      res.status(200).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const userMessage = event.message.text;

  const replyText = `你說了：${userMessage}`;

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

app.get("/", (req, res) => {
  res.send("LINE Webhook is running 🚀");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
