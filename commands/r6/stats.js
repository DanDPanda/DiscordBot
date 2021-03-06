// Creating the discord bot
const Discord = require("discord.js");
const RainbowSixApi = require("rainbowsix-api-node");
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

  R6.stats(username, platform, false)
    .then(response => {
      let wins = parseInt(response.player.stats.casual.wins) + parseInt(response.player.stats.ranked.wins);
      let losses = parseInt(response.player.stats.casual.losses) + parseInt(response.player.stats.ranked.losses);
      let kills = parseInt(response.player.stats.casual.kills) + parseInt(response.player.stats.ranked.kills);
      let deaths = parseInt(response.player.stats.casual.deaths) + parseInt(response.player.stats.ranked.deaths);

      // Creates the embed
      const embed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setAuthor(
          `Tachanka`,
          "https://ubistatic19-a.akamaihd.net/resource/pt-br/game/rainbow6/siege/r6-operator-tachanka_229936.png"
        )
        .setTitle(`${username}'s R6 Overall Stats`)
        .setThumbnail("https://i.redd.it/iznunq2m8vgy.png")
        .setFooter(`All information derived from r6stats.com`)
        .addField("Wins", `${wins}`, true)
        .addField("Losses", `${losses}`, true)
        .addField("W/L Ratio", `${(wins/losses).toFixed(2)}`, true)
        .addField("Kills", `${kills}`, true)
        .addField("Deaths", `${deaths}`, true)
        .addField("K/D Ratio", `${(kills/deaths).toFixed(2)}`, true);
      message.channel.send(embed);
    })
    .catch(error => {
      console.error(error);
    });
};
