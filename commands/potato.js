const checkAdmin = (message) => {
  const checkRole = (role) => {
    return !!message.member.roles.find((r) => r.name.toLowerCase() === role);
  };
  return (
    checkRole("admin") ||
    checkRole("pepehands") ||
    message.author.id === "66250785419169792"
  );
};

module.exports = {
  name: "potato",
  description: "Potato!",
  async execute(msg, args, db) {
    switch (args[0]) {
      case "link":
        if (checkAdmin(msg)) {
          console.log("arguments: ", args);
          if (args.length === 3) {
            const res = await db.collection("discord-bot").doc().set({
              command: args[1],
              link: args[2],
            });
            msg.reply("Successfully added command: " + args[1]);
          } else {
            msg.reply(
              'Please format your new command with "!potato link [command name] [link name]"'
            );
          }
        } else {
          msg.reply("You don't have the rights to do this you non white");
        }
        break;
      default:
        break;
    }
  },
};
