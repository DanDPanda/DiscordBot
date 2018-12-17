const Discord = require("discord.js");
let rpg = require("../../rpg.json");
const fs = require("fs");

exports.run = (bot, message, args, tools) => {
    if (args.length == 0) {
        if (message.author.id != 130519896441356288) {
            message.channel.send(`${message.author}, unauthorized use.`).then(msg => {msg.delete(10000)});
            message.delete(5000);
            return;
        }
        for (var key in rpg) {
            rpg[key].action_points+= 3;
        }
        // Writes to the two JSON files
        fs.writeFileSync(__dirname +"/../../rpg.json", JSON.stringify(rpg), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}