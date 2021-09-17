module.exports = {
  name: "ping",
  description: "Ping!",
  execute(msg, args, db) {
    msg.reply("pong");
  },
};
