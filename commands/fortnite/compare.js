const Discord = require("discord.js");
const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

exports.run = (bot, message, args, db) => {
  if (args.length === 4) {
    let player1 = ft
      .user(args[0], args[1])
      .then(player1 => {
        setTimeout(function() {
          let player2 = ft
            .user(args[2], args[3])
            .then(player2 => {
              const embed = new Discord.RichEmbed()
                .setColor(0xff0000)
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setTitle(`${player1.username} vs ${player2.username}\n\n`)
                .setThumbnail("https://i.imgur.com/IMjozOI.jpg")
                .addField(
                  "Total Score",
                  `${player1.username}: ${player1.stats.lifetime[6].Score}\n` +
                    `${player2.username}: ${player2.stats.lifetime[6].Score}`,
                  true
                )
                .addField(
                  "Matches Played",
                  `${player1.username}: ${
                    JSON.stringify(player1.stats.lifetime[7]).split('"')[3]
                  }\n` +
                    `${player2.username}: ${
                      JSON.stringify(player2.stats.lifetime[7]).split('"')[3]
                    }`,
                  true
                )
                .addField(
                  "Wins",
                  `${player1.username}: ${
                    JSON.stringify(player1.stats.lifetime[8]).split('"')[3]
                  }\n` +
                    `${player2.username}: ${
                      JSON.stringify(player2.stats.lifetime[8]).split('"')[3]
                    }`,
                  true
                )
                .addField(
                  "Win Percentage",
                  `${player1.username}: ${
                    JSON.stringify(player1.stats.lifetime[9]).split('"')[3]
                  }\n` +
                    `${player2.username}: ${
                      JSON.stringify(player2.stats.lifetime[9]).split('"')[3]
                    }`,
                  true
                )
                .addField(
                  "Kills",
                  `${player1.username}: ${player1.stats.lifetime[10].Kills}\n` +
                    `${player2.username}: ${player2.stats.lifetime[10].Kills}`,
                  true
                )
                .addField(
                  "K/D Ratio",
                  `${player1.username}: ${
                    JSON.stringify(player1.stats.lifetime[11]).split('"')[3]
                  }\n` +
                    `${player2.username}: ${
                      JSON.stringify(player2.stats.lifetime[11]).split('"')[3]
                    }`,
                  true
                )
                .addField(
                  "Kills Per Minute",
                  `${player1.username}: ${
                    JSON.stringify(player1.stats.lifetime[12]).split('"')[3]
                  }\n` +
                    `${player2.username}: ${
                      JSON.stringify(player2.stats.lifetime[12]).split('"')[3]
                    }`,
                  true
                )
                .setFooter("All information derived from FortniteTracker.com");
              message.channel.send(embed);
            })
            .catch(e => {
              message.channel.send(
                "Please send message in the format:\n**!fortcompare <name1> <name2>**"
              );
              message.channel.send({
                files: ["https://i.imgur.com/HeGEEbu.jpg"]
              });
            });
        }, 4000);
        message.delete(5000);
      })
      .catch(e => {
        message.channel
          .send(
            "Please send message in the format:\n**!fortcompare <name1> <name2>**"
          )
          .then(msg => {
            msg.delete(5000);
            message.delete(5000);
          });
      });
  }
};
