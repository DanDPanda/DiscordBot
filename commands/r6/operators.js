// Creating the discord bot
const Discord = require("discord.js");
const RainbowSixApi = require("rainbowsix-api-node");
const R6 = new RainbowSixApi();

exports.run = async (bot, message, args, tools) => {
  let username;
  let platform;
  let operator;

  if (args.length == 2) {
    username = args[0];
    operator = args[1].toLowerCase();
    platform = "uplay";
  } else if (args.length == 3) {
    username = args[0];
    operator = args[1].toLowerCase();
    platform = args[2];
  } else {
    return;
  }

  R6.stats(username, platform, true)
    .then(response => {
      // Creates the embed
      // console.log(response.operator_records);
      response.operator_records.forEach(op => {
        if (operator == "jager") {
          operator = "jäger"
        }
        if (op.operator.name.toLowerCase() == operator) {
          if (operator == "jäger") {
            operator = "jager"
          }
          const embed = new Discord.RichEmbed()
          .setColor(0xff0000)
          .setAuthor(
            op.operator.name,
            `https://cdn.r6stats.com/badges/${operator}_badge.png`
          )
          .setTitle(`${username}'s R6 ${op.operator.name} Stats`)
          .setThumbnail(`https://cdn.r6stats.com/badges/${operator}_badge.png`)
          .setFooter(`All information derived from r6stats.com`)
          .addField("Played", `${op.stats.played}`, true)
          .addField("Wins", `${op.stats.wins}`, true)
          .addField("Losses", `${op.stats.losses}`, true)
          .addField("Kills", `${op.stats.kills}`, true)
          .addField("Deaths", `${op.stats.deaths}`, true)
          .addField("K/D Ratio", `${(op.stats.kills / op.stats.deaths).toFixed(2)}`, true);
          message.channel.send(embed);
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
};
