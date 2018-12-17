const Discord = require("discord.js");

exports.run = (bot, message, args, tools) => {
  if (message.author.username == "Dink") {
    message.channel.send(
      "Hello my name is Pizza Pupper and here are my Fortnite Commands:"
    );
    const embed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setTitle("Fortnite Commands\n\n")
      .setDescription(
        "All information is derived from [FortniteTracker.com](http://FortniteTracker.com)\n"
      )
      .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
      .addField("Lifetime Stats:", "!fortlife <name> <pc|xbl|psn>", true)
      .addBlankField(true)
      .addField("Lifetime Wins:", "!fortwins <name> <pc|xbl|psn>", true)
      .addBlankField(true)
      .addField("Solo Stats:", "!fortsolo <name> <pc|xbl|psn>", true)
      .addBlankField(true)
      .addField("Duo Stats:", "!fortduo <name> <pc|xbl|psn>", true)
      .addBlankField(true)
      .addField("Squad Stats:", "!fortsquad <name> <pc|xbl|psn>", true)
      .addBlankField(true)
      .addField(
        "Compare Stats (PC Only):",
        "!fortcompare <name1> <pc|xbl|psn> <name2> <pc|xbl|psn>",
        true
      );
    message.channel.send(embed);
    message.channel.send("-\n-\n**Examples**\n-\n-");
    message.channel.send("!fortcompare lykye pc ChuốiGiêsu pc");
    setTimeout(function() {
      message.channel.send("!fortlife ChuốiGiêsu pc");
    }, 10000);
  }
};
