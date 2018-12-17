const Discord = require("discord.js");

exports.run = (bot, message, args, tools) => {
  if (message.author.username == "Dink") {
    message.channel.send(
      "Hello my name is Pizza Pupper and here are my Poke Commands:"
    );
    let text = "```\n";
    text += "RULES\n";
    text += "\n";
    text += "Your goal is to catch all of the pokemon out there.\n";
    text +=
      "Based on a random chance, pokemons spawn when a message is sent.\n";
    text += "Pokemon duration is based off of their rarity.\n";
    text +=
      "Everybody is able to catch a pokemon when it spawns, it is not a race.\n";
    text += "\n";
    text += "Equip a pokemon using !pokeset <pokemon #>. EX: !pokeset 1\n";
    text +=
      "Equipped pokemon can be used to showoff or to evolve using the !pokevolve command.\n";
    text +=
      "You can evolve a pokemon once you surpass the needed EXP threshold.\n";
    text += "This can be checked by using the !pokestat command.\n";
    text += "Evolving a pokemon will use up EXP.\n";
    text += "You generate 1 EXP by sending a message in the chat\n";
    text += "\n";
    text += "PLEASE DO NO SPAM THE CHAT TO GET EXP!\n";
    text += "\n";
    text += "That should be all, good luck catching them!\n";
    text += "```";
    message.channel.send(text);
    const embed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setTitle("Poke Commands\n\n")
      .setDescription(
        "Pokemon have a 5%-10% chance to appear per message.\n" +
          "Rarer Pokemon have shorter catch windows.\n" +
          "There are currently 151 pokemon in the database."
      )
      .setThumbnail(
        "https://cdn4.iconfinder.com/data/icons/longico/224/longico-23-512.png"
      )
      .addField("Catch Pokemon:", "!catch", true)
      .addField("Poke Stats", "!pokestats", true)
      .addField("List of Pokemon:", "!pokelist", true)
      .addField("Equip Your Pokemon", "!pokeset <pokemon #>", true)
      .addField("Evolve Your Pokemon", "!pokevolve", true)
      .setFooter(
        `"Try to catch them all!"`,
        "https://cdn4.iconfinder.com/data/icons/longico/224/longico-23-512.png"
      );
    message.channel.send(embed);
  }
};
