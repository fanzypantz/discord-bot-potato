module.exports = {
  name: "dynamic",
  description: "Dynamic Link!",
  async execute(msg, args, db) {
    console.log("args: ", args);
    const commandRef = db.collection("discord-bot");
    const snapshot = await commandRef
      .where("command", "==", msg.content.slice(1))
      .get();

    if (snapshot.empty) {
      msg.reply("This command does not exist");
    } else {
      msg.channel.send(snapshot.docs[0].data().link);
    }
  },
};
