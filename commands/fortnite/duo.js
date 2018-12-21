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
          .setTitle(`Duo Stats for ${data.username}\n\n`)
          .setDescription(
            `Wins: *${data.stats.duo.wins}*\n` +
              `Top 5 Duo: *${parseInt(
                JSON.stringify(data.stats.lifetime[1]).split('"')[3],
                10
              )}*\n` +
              `Top 12 Duo: *${parseInt(
                JSON.stringify(data.stats.lifetime[4]).split('"')[3],
                10
              )}*`,
            true
          )
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.duo.score, true)
          .addField("Matches Played", data.stats.duo.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.duo.wins) /
                parseInt(data.stats.duo.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.duo.kills, true)
          .addField("K/D Ratio", data.stats.duo.kd, true)
          .addField("Kills Per Minute", data.stats.duo.kills_per_match, true)
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);

        embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            "John Wick",
            "https://img.etsystatic.com/il/b9f2f5/1462736406/il_570xN.1462736406_r69v.jpg"
          )
          .setTitle(`Season Duo Stats for ${data.username}\n\n`)
          .setDescription(`Wins: *${data.stats.current_duo.wins}*`, true)
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.current_duo.score, true)
          .addField("Matches Played", data.stats.current_duo.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.current_duo.wins) /
                parseInt(data.stats.current_duo.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.current_duo.kills, true)
          .addField("K/D Ratio", data.stats.current_duo.kd, true)
          .addField(
            "Kills Per Minute",
            data.stats.current_duo.kills_per_match,
            true
          )
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortduo <name> <pc|xbl|psn>**"
          )
          .then(msg => {
            msg.delete(5000);
            message.delete(5000);
          });
      });
  }
};
