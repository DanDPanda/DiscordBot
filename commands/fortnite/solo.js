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
          .setTitle(`Solo Stats for ${data.username}\n\n`)
          .setDescription(
            `Wins: *${data.stats.solo.wins}*\n` +
              `Top 10 Solo: *${parseInt(
                JSON.stringify(data.stats.lifetime[0]).split('"')[3],
                10
              )}*\n` +
              `Top 25 Solo: *${parseInt(
                JSON.stringify(data.stats.lifetime[5]).split('"')[3],
                10
              )}*`,
            true
          )
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.solo.score, true)
          .addField("Matches Played", data.stats.solo.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.solo.wins) /
                parseInt(data.stats.solo.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.solo.kills, true)
          .addField("K/D Ratio", data.stats.solo.kd, true)
          .addField("Kills Per Minute", data.stats.solo.kills_per_match, true)
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);

        embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            "John Wick",
            "https://img.etsystatic.com/il/b9f2f5/1462736406/il_570xN.1462736406_r69v.jpg"
          )
          .setTitle(`Season Solo Stats for ${data.username}\n\n`)
          .setDescription(`Wins: *${data.stats.current_solo.wins}*`, true)
          .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
          .addField("Total Score", data.stats.current_solo.score, true)
          .addField("Matches Played", data.stats.current_solo.matches, true)
          .addField(
            "Win Percentage",
            (
              (parseInt(data.stats.current_solo.wins) /
                parseInt(data.stats.current_solo.matches)) *
              100
            ).toFixed(2) + "%",
            true
          )
          .addField("Kills", data.stats.current_solo.kills, true)
          .addField("K/D Ratio", data.stats.current_solo.kd, true)
          .addField(
            "Kills Per Minute",
            data.stats.current_solo.kills_per_match,
            true
          )
          .setFooter("All information derived from FortniteTracker.com");
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortsolo <name> <pc|xbl|psn>**"
          )
          .then(msg => {
            msg.delete(5000);
            message.delete(5000);
          });
      });
  }
};
