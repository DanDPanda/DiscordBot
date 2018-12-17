const Discord = require("discord.js");
const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

exports.run = (bot, message, args, tools) => {
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
          .setTitle(`Lifetime Wins for ${data.username}\n\n`)
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Wins", data.stats.lifetime[8].Wins, true)
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortwin <name> <pc|xbl|psn>**"
          )
          .then(msg => {
            msg.delete(5000);
          });
      });
  }
};
