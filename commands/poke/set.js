// Creating the discord bot
const Discord = require("discord.js");

// Updates the current pokemon.
function update_pokemon(message, args) {
  return new Promise(function(resolve, reject) {
    console.log(
      `${message.author.username} has updated to pokemon number ${args[0]}.`
    );
    args[1].query(
      `UPDATE trainer SET number = ? WHERE id = ?;`,
      [args[0], message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Checks if the trainer has the pokemon.
function check_list(message, args) {
  return new Promise(function(resolve, reject) {
    args[1].query(
      `SELECT * FROM trainer_pokemon tp, pokemon p WHERE tp.trainer_id = ? AND tp.pokemon_number = ? AND tp.pokemon_number = p.number;`,
      [message.author.id, args[0]],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

exports.run = async (bot, message, args, tools) => {
  // Command has to be !pokeset <int>
  if (args.length === 2) {
    let valid = 1;

    // Counts the total number
    await check_list(message, args).then(rows => {
      valid = rows;
    });

    try {
      if (valid.length == 0) {
        console.log(`${message.author.username} doesn't have ${args[0]}.`);
        message.author.send("You don't have that pokemon!");
        if (message.guild != null) {
          message.delete(5000);
        }
        return;
      }
    } catch (e) {
      return;
    }

    // Updates the trainer's current pokemon
    await update_pokemon(message, args);
    message.author.send(
      `Pokemon updated to **${valid[0].number}.${valid[0].name}**!`
    );
    if (message.guild != null) {
      message.delete(5000);
    }
  }
};
