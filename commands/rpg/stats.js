const Discord = require("discord.js");
let rpg = require("../../rpg.json");

exports.run = (bot, message, args, tools) => {
    if (args.length == 0) {
        if (message.channel.id != 437455333347033090 && message.channel.id != 435576789960753153) {
            message.channel.send(`${message.author}, please use this command in the boss-fight channel.`).then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        }
        if (!rpg[message.author.id]) {
            rpg[message.author.id] = {
                level: 1,
                exp: 0,
                skill_points: 0,
                action_points: 0,
                attack: 1,
                max_hp: 5,
                hp: 5,
                next_level: 10,
            };
        } 
        const embed = new Discord.RichEmbed()
        .setColor(0x00ff00)
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle(`${message.author.username}'s stats`)
        .addField("Level", rpg[message.author.id].level, true)
        .addField("Total EXP", rpg[message.author.id].exp, true)
        .addField("Extra Skill Points", rpg[message.author.id].skill_points, true)
        .addField("Remaining Action Points", rpg[message.author.id].action_points, true)
        .addField("Attack Level", rpg[message.author.id].attack, true)
        .addField("Percent HP", (parseInt(rpg[message.author.id].hp)/parseInt(rpg[message.author.id].max_hp)*100).toFixed(0) + "%", true)
        .addField("Max HP", rpg[message.author.id].max_hp, true)
        .addField("Remaining HP", rpg[message.author.id].hp, true)
        .setFooter(`EXP needed until next level: ${ rpg[message.author.id].next_level}` , "https://d30y9cdsu7xlg0.cloudfront.net/png/103193-200.png");
        message.channel.send(embed).then(msg => {msg.delete(30000)});
    } else {
        message.channel.send("Please send message in the format:\n**!rpgstats**").then(msg => {msg.delete(10000)});
        message.channel.send({files: ["https://i.imgur.com/HeGEEbu.jpg"]}).then(msg => {msg.delete(10000)});
    }
    message.delete(5000);
}