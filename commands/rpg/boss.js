const Discord = require("discord.js");
let boss = require("../../boss.json");

exports.run = (bot, message, args, tools) => {
    if (args.length == 0) {
        if (message.channel.id != 437455333347033090 && message.channel.id != 435576789960753153) {
            message.channel.send(`${message.author}, please use this command in the boss-fight channel.`).then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        }
        if (!boss[0]) {
            message.channel.send("There is currently no boss").then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        } 
        const embed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setThumbnail( boss[0].image)
            .setTitle(`Boss has appeared!`)
            .addField("Name", boss[0].name, true)
            .addField("Level", boss[0].level, true)
            .addField("Current HP", boss[0].hp, true)
            .addField("Attack", boss[0].attack, true)
            .addField("EXP per Damage", boss[0].exp_per_damage, true)
            .setFooter("Type !rpghit to attack it for more EXP!" , "https://d30y9cdsu7xlg0.cloudfront.net/png/103193-200.png");
        message.channel.send(embed).then(msg => {msg.delete(30000)});
    } else {
        message.channel.send("Please send message in the format:\n**!rpgboss**").then(msg => {msg.delete(10000)});
        message.channel.send({files: ["https://i.imgur.com/HeGEEbu.jpg"]}).then(msg => {msg.delete(10000)});
    }
    message.delete(5000);
}