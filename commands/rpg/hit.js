const Discord = require("discord.js");
let rpg = require("../../rpg.json");
let boss = require("../../boss.json");
const fs = require("fs");

exports.run = (bot, message, args, tools) => {
    if (message.channel.id != 437455333347033090 && message.channel.id != 435576789960753153) {
        message.channel.send(`${message.author}, please use this command in the boss-fight channel.`).then(msg => {msg.delete(10000)});
        message.delete(5000);
        return;
    }
    if (args.length == 0) {
        if (!boss[0]) {
            message.channel.send("There is currently no boss").then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        } else if (rpg[message.author.id].action_points <= 0) {
            message.channel.send(`You do not have enough action points, ${message.author}!`).then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        } else {

            // Initialize the player if it doesn't exist
            if (!rpg[message.author.id]) {
                rpg[message.author.id] = {
                    level: 1,
                    exp: 0,
                    skill_points: 0,
                    action_points: 0,
                    attack: 1,
                    max_hp: 10,
                    hp: 10,
                    next_level: 10,
                };
            } 

            // HP calculations
            if (rpg[message.author.id].hp <= 0) {

                // Creates the revive embed
                const revive = new Discord.RichEmbed()
                .setColor(0x00ff00)
                .setThumbnail(message.author.displayAvatarURL)
                .setTitle(`${message.author.username} uses an action point to regain hp!`)
                message.channel.send(revive).then(msg => {msg.delete(10000)});

                // Sends the message
                rpg[message.author.id].hp = rpg[message.author.id].max_hp;
                rpg[message.author.id].action_points--;
                if (rpg[message.author.id].action_points <= 0) {
                    message.channel.send(`You used your last action point to heal, ${message.author}!`).then(msg => {msg.delete(10000)});
                    message.delete(5000);
                    return;
                }
            }

            // Create the message before the calucaltion
            const embed = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setThumbnail( boss[0].image)
            .setTitle(`${message.author.username} attacks ${boss[0].name}!`)
            .addField("Boss HP", `${boss[0].hp} => ${boss[0].hp - rpg[message.author.id].attack}`, true)
            .addField(`${message.author.username} HP`, `${rpg[message.author.id].hp} => ${rpg[message.author.id].hp - boss[0].attack}`, true)
            .addField(`EXP Gain`, `${rpg[message.author.id].exp} => ${rpg[message.author.id].exp + boss[0].exp_per_damage * rpg[message.author.id].attack}`, true)
            .addField(`EXP Until Next Level`, `${rpg[message.author.id].next_level - boss[0].exp_per_damage * rpg[message.author.id].attack}`, true)
            .addField(`Remaining Action Points`, `${rpg[message.author.id].action_points} => ${rpg[message.author.id].action_points-1}`, true)
            .setFooter("Type !rpghit to attack it for more EXP!" , "https://d30y9cdsu7xlg0.cloudfront.net/png/103193-200.png");

            // HP calcualtions and EXP calculations
            boss[0].hp -= rpg[message.author.id].attack;
            rpg[message.author.id].hp -= boss[0].attack;
            rpg[message.author.id].action_points--;
            rpg[message.author.id].exp += boss[0].exp_per_damage * rpg[message.author.id].attack;
            rpg[message.author.id].next_level -= boss[0].exp_per_damage * rpg[message.author.id].attack;

            // Writes to the two JSON files
            fs.writeFileSync(__dirname +"/../../boss.json", JSON.stringify(boss), (err) => {
                if (err) {
                    console.log(err);
                }
            });

            fs.writeFileSync(__dirname +"/../../rpg.json", JSON.stringify(rpg), (err) => {
                if (err) {
                    console.log(err);
                }
            });

            // Finally sends the message
            message.channel.send(embed);
        }
    } else {
        message.channel.send("Please send message in the format:\n**!rpgboss**");
        message.channel.send({files: ["https://i.imgur.com/HeGEEbu.jpg"]});
    }
    message.delete(5000);
}