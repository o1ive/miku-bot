"use strict";

const server = require("express")();
require('dotenv').config();
const line = require("@line/bot-sdk");

const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret:      process.env.LINE_CHANNEL_SECRET
}
console.log(line_config);
server.listen(process.env.PORT || 3000);

const bot = new line.Client(line_config);

server.post('/webhook', line.middleware(line_config), (req:any, res:any, next:any) => {
  res.sendStatus(200);

  let events_processed:any = [];

  req.body.events.forEach((event:any) => {
    if (event.type == "message" && event.message.type == "text"){
      if (event.message.text == "こんにちは"){
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: "こんにちは初音ミクだよ"
        }));
      }
    }
  });

  Promise.all(events_processed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`);
    }
  );
});

