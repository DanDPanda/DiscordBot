// Creating the discord bot
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

// Additional Requiring
let rpg = require("./rpg.json");
let boss = require("./boss.json");

// Creating the prefixes
const prefix = "!";
const rpg_prefix = "!rpg";
const fortnite_prefix = "!fort";

// This reads the message and sends the appropriate command
bot.on('message', (message) => {

    if (message.channel.id == 437455333347033090 && !(message.content.toLowerCase().startsWith(rpg_prefix))) {
        if (!message.author.bot && !(message.author.username == "Dink")) {
            message.channel.send(`${message.author}, only messages that start with !rpg are allowed here`).then(msg => {
                msg.delete(10000)
            });
            message.delete(1000);
        }
    }

    // If author does not exist, then they will be created
    if (!rpg[message.author.id]) {
        rpg[message.author.id] = {
            level: 1,
            exp: 0,
            skill_points: 0,
            action_points: 3,
            attack: 1,
            max_hp: 5,
            hp: 5,
            next_level: 10,
        };
        fs.writeFileSync("./rpg.json", JSON.stringify(rpg), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } 

    // Author gets points
    //rpg[message.author.id].exp += 3;
    //rpg[message.author.id].next_level -= 3;

    // Spawns the boss
    if (!boss[0] && (message.channel.id == 437455333347033090 || message.channel.id == 435576789960753153)) {
        boss[0] = {
            name: "Shaolin Barricade Shield",
            image: "http://2.bp.blogspot.com/__NnUjUCx5cg/TF8GE8WleHI/AAAAAAAAAfU/HLuN7YARdFo/w1200-h630-p-nu/shaolinsoccer.jpg",
            level: 1,
            attack: 0,
            hp: 50,
            exp_per_damage: 5
        };
        let boss_stats = new Discord.RichEmbed()
            .setColor(0xff0000)
            .setThumbnail( boss[0].image)
            .setTitle(`Boss has appeared!`)
            .addField("Name", boss[0].name, true)
            .addField("Level", boss[0].level, true)
            .addField("Current HP", boss[0].hp, true)
            .addField("Attack", boss[0].attack, true)
            .addField("EXP per Damage", boss[0].exp_per_damage, true)
            .setFooter("Type !rpghit to attack it for more EXP!" , "https://d30y9cdsu7xlg0.cloudfront.net/png/103193-200.png");
        message.channel.send(boss_stats);
        fs.writeFileSync("./boss.json", JSON.stringify(boss), (err) => {
            if (err) {
                console.log(err);
            }
        });
    } 

    // Command reading
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let new_prefix = prefix;

    if (msg.startsWith(fortnite_prefix)) {
        new_prefix = fortnite_prefix;
    } else if (msg.startsWith(rpg_prefix)) {
        new_prefix = rpg_prefix;
    } else if (msg.startsWith(new_prefix)) {
        new_prefix = prefix;
    } else {
        return;
    }

    let args = message.content.slice(new_prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    try {
        let commandFile;
        //console.log(cmd);
        //console.log(message);
        //console.log(args);
        if (new_prefix == fortnite_prefix) {
            commandFile = require(`./commands/fortnite/${cmd}.js`);
        } else if (new_prefix == rpg_prefix) {
            commandFile = require(`./commands/rpg/${cmd}.js`);
        } else {
            commandFile = require(`./commands/${cmd}.js`);
        }
        commandFile.run(bot, message, args);
    } catch (e) {
        console.log("Error with this command.");
    }

    // If the author is ready to level up, they will get stats increase and a message
    if (rpg[message.author.id].next_level <= 0) {
        rpg[message.author.id].level += 1;
        rpg[message.author.id].skill_points += 1;
        rpg[message.author.id].next_level = rpg[message.author.id].level*10 + rpg[message.author.id].next_level;

        let embed = new Discord.RichEmbed()
            .setColor(0x00ff00)
            .setThumbnail(message.author.displayAvatarURL)
            .setTitle(`${message.author.username} Level Up!`)
            .addField("Level", `${parseInt(rpg[message.author.id].level)-1} => ${rpg[message.author.id].level}`, true)
            .addField("Total EXP", rpg[message.author.id].exp, true)
            .addField("Extra Skill Points", `${parseInt(rpg[message.author.id].skill_points)-1} => ${rpg[message.author.id].skill_points}`, true)
            .addField("EXP til Next Level", rpg[message.author.id].next_level, true)
            .setFooter("!rpgattack to increase attack level and !rpghp to increase hp." , "https://d30y9cdsu7xlg0.cloudfront.net/png/103193-200.png");
        message.channel.send(`${message.author}`).then(msg => {msg.delete(20000)});
        message.channel.send(embed).then(msg => {msg.delete(20000)});
        fs.writeFileSync("./rpg.json", JSON.stringify(rpg), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }


});

bot.login('MjI3MTc4MzY1MzgyMDMzNDA5.DbaHYw.0rWopGfCpL3jwiDO9fQ0DXMi93k');