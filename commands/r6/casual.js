// Creating the discord bot
const Discord = require("discord.js");
const RainbowSixApi = require('rainbowsix-api-node');
const R6 = new RainbowSixApi();

exports.run = async (bot, message, args, tools) => {
  let username;
  let platform;

  if (args.length == 1) {
    username = args[0];
  }
  if (args.length == 2) {
    platform = args[1];
  } else {
    platform = "uplay";
  }

  R6.stats(username, platform, false).then(response => {
    // Creates the embed
    const embed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor(
        `Tachanka`,
        "https://ubistatic19-a.akamaihd.net/resource/pt-br/game/rainbow6/siege/r6-operator-tachanka_229936.png"
      )
      .setTitle(`${username}'s R6 Casual Stats`)
      .setThumbnail("https://i.redd.it/iznunq2m8vgy.png")
      .setFooter(
        `All information derived from r6stats.com`
      ).addField("Wins", `${response.player.stats.casual.wins}`, true)
      .addField("Losses", `${response.player.stats.casual.losses}`, true)
      .addField("W/L Ratio", `${response.player.stats.casual.wlr}`, true)
      .addField("Kills", `${response.player.stats.casual.kills}`, true)
      .addField("Deaths", `${response.player.stats.casual.deaths}`, true)
      .addField("K/D Ratio", `${response.player.stats.casual.kd}`, true);
    message.channel.send(embed);
    console.log(response.player.stats.casual);
  }).catch(error => {
    console.error(error);
  });
};
