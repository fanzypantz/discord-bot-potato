require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const admin = require("firebase-admin");
const serviceAccount = require("./firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

bot.login(TOKEN);
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
bot.commands = new Discord.Collection();
const botCommands = require("./commands");

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on("message", async (msg) => {
  const args = msg.content.split(/ +/);
  let command = args.shift().toLowerCase();

  if (command.startsWith("!")) {
    command = "dynamic";
  }
  if (!bot.commands.has(command) || command.startsWith("!")) return;
  console.info(`Called command: ${command}`);

  try {
    bot.commands.get(command).execute(msg, args, db);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }

  // switch (true) {
  //   case msg.content.toLowerCase() === "ping":
  //     msg.reply("pong");
  //     return;
  //   case msg.content.startsWith("!kick"):
  //     if (msg.mentions.users.size) {
  //       const taggedUser = msg.mentions.users.first();
  //       msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
  //     } else {
  //       msg.reply("Please tag a valid user!");
  //     }
  //     return;
  //   case msg.content.startsWith("!potato link"):

  //     return;
  // //   case msg.content.startsWith("!"):
  //     console.log("msg.member.roles: ", msg.member.roles);
  //     const commandRef = db.collection("discord-bot");
  //     const snapshot = await commandRef
  //       .where("command", "==", msg.content.slice(1))
  //       .get();
  //
  //     if (snapshot.empty) {
  //       msg.reply("This command does not exist");
  //     } else {
  //       msg.channel.send(snapshot.docs[0].data().link);
  //     }
  //     return;
  //   default:
  //     return;
  //   }
});
