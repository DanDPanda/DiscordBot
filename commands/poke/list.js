// Creating the discord bot
const Discord = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args, tools) => {
  // Command has to be !pokelist
  if (args.length === 1) {
    // Creates the boxed text for each pokemon the person has
    // New line for each pokemon
    var text = "```\n";
    let sql = `SELECT p.number, p.name 
        FROM pokemon p, trainer_pokemon tp 
        WHERE tp.trainer_id = ? 
        AND p.number = tp.pokemon_number
        ORDER BY p.number;`;

    // Starts the database search
    args[0].query(sql, [message.author.id], (err, rows) => {
      if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
          text += `${rows[i].number}. ${rows[i].name}\n`;
        }
      }
      text += "```";
      message.author.send(text);
    });
  }
};
