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
        let embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            "John Wick",
            "https://img.etsystatic.com/il/b9f2f5/1462736406/il_570xN.1462736406_r69v.jpg"
          )
          .setTitle(`Lifetime Squad Stats for ${data.username}\n\n`)
          .setDescription(
            `Wins: *${data.stats.squad.wins}*\n` +
              `Top 3 Squad: *${parseInt(
                JSON.stringify(data.stats.lifetime[2]).split('"')[3],
                10
              )}*\n` +
              `Top 6 Squad: *${parseInt(
                JSON.stringify(data.stats.lifetime[3]).split('"')[3],
                10
              )}*`,
            true
          )
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.squad.score, true)
          .addField("Matches Played", data.stats.squad.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.squad.wins) /
                parseInt(data.stats.squad.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.squad.kills, true)
          .addField("K/D Ratio", data.stats.squad.kd, true)
          .addField("Kills Per Minute", data.stats.squad.kills_per_match, true)
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);

        embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            "John Wick",
            "https://img.etsystatic.com/il/b9f2f5/1462736406/il_570xN.1462736406_r69v.jpg"
          )
          .setTitle(`Season Squad Stats for ${data.username}\n\n`)
          .setDescription(`Wins: *${data.stats.current_squad.wins}*`, true)
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.current_squad.score, true)
          .addField("Matches Played", data.stats.current_squad.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.current_squad.wins) /
                parseInt(data.stats.current_squad.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.current_squad.kills, true)
          .addField("K/D Ratio", data.stats.current_squad.kd, true)
          .addField(
            "Kills Per Minute",
            data.stats.current_squad.kills_per_match,
            true
          )
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortsquad <name> <pc|xbl|psn>**"
          )
          .then(msg => {
            msg.delete(5000);
            message.delete(5000);
          });
      });
  }
};
