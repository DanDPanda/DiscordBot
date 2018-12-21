const Discord = require("discord.js");
const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

exports.run = (bot, message, args, db) => {
  let platform;
  if (args.length > 0 && args.length < 3) {
    if (args.length === 1) {
      platform = "pc";
    } else {
      platform = args[1];
    }
    let data = ft
      .user(args[0], platform)
      .then(data => {
        const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            "John Wick",
            "https://img.etsystatic.com/il/b9f2f5/1462736406/il_570xN.1462736406_r69v.jpg"
          )
          .setTitle(`Duo Stats for ${data.username}\n\n`)
          .setTitle(`Lifetime Stats for ${data.username}\n\n`)
          .setDescription(
            `Wins: *${data.stats.lifetime[8].Wins}*\n`,
            true
          )
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.lifetime[6].Score, true)
          .addField(
            "Matches Played",
            data.stats.lifetime[7]["Matches Played"],
            true
          )
          .addField("Win Percentage", data.stats.lifetime[9]["Win%"], true)
          .addField("Kills", data.stats.lifetime[10].Kills, true)
          .addField("K/D Ratio", data.stats.lifetime[11]["K/d"], true)
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortlife <name> <pc|xbl|psn>**"
          )
          .then(msg => {
            msg.delete(5000);
            message.delete(5000);
          });
      });
  }
};
