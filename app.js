const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const joke = require("./phrases/joke");
const spin = require("./Abilities/spin");

function* getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// replace the value below with the Telegram token you receive from @BotFather
const token = "578150225:AAEqor-R_-qxSskCAVXdVbje13UtslhyRlM";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, fs.readFileSync("./phrases/greeting", "utf8"));
  console.log(msg.chat.title);
  console.log(msg.text);
  console.log(msg.from.username);
});

bot.onText(/\/joke/, msg => {
  console.log(msg.chat.title);
  console.log(msg.text);
  console.log(msg.from.username);
  let kek = joke.Joke();
  bot.sendMessage(msg.chat.id, kek);
});

//Леха
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
  console.log(msg.from.username);
  console.log(resp);
  console.log(msg.chat.title);
  console.log(msg.text);
});

//Заходит нн в бар...
bot.on("message", msg => {
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("заходит") &&
    msg.text
      .toString()
      .toLowerCase()
      .includes("в бар")
  ) {
    let ans =
      "А бармен ему говорит:\n" + "-" + msg.text.slice(7, -5) + "пошел нахуй!";
    console.log(msg.chat.title);
    console.log(msg.text);
    console.log(msg.from.username);
    bot.sendMessage(msg.chat.id, ans);
  }
});
//купил нн шляпу
bot.on("message", msg => {
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("купил") &&
    msg.text
      .toString()
      .toLowerCase()
      .includes("шляпу")
  ) {
    let ans = "А она ему как раз.";
    console.log(msg.chat.title);
    console.log(msg.text);
    console.log(msg.from.username);
    bot.sendMessage(msg.chat.id, ans);
  }
});

//stipuha
bot.on("message", msg => {
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes("стипуха пришла")
  ) {
    let ans =
      "Заходит в бар тот, кто побогател на 1300 гривен, а бармен ему говорит:\n - Андрей, пошёл нахуй!";
    console.log(msg.chat.title);
    console.log(msg.text);
    console.log(msg.from.username);
    bot.sendMessage(msg.chat.id, ans);
  }
});

bot.onText(/\/spin/, msg => {
  path = spin.Spin();
  console.log(path);
  bot.sendPhoto(msg.chat.id, path);
});

bot.onText(/\/debug/, msg => {
  bot.sendDocument(
    msg.chat.id,
    "http://freemap.com.ua/maps/genshtab/m-37-114.jpg"
  );
});

bot.onText(/\/chmdeb/, msg => {
  bot.sendMessage(msg.chat.id, "#meme");
});
