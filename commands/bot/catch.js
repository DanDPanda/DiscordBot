const fs = require("fs");

// Creating the discord bot
const Discord = require("discord.js");
const util = require("../../util");

// Creates the trainer in the case that they don't exist
function make_trainer(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(
      `SELECT * FROM trainer WHERE id = ?;`,
      [message.author.id],
      (err, rows) => {
        if (rows.length == 0) {
          db.query(`INSERT INTO trainer (id, nickname) VALUE (?, ?);`, [
            message.author.id,
            message.author.username
          ]);
        }
        resolve(rows);
      }
    );
  });
}

// Gets the current pokemon
function get_current(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM current_pokemon;`, (err, rows) => {
      resolve(rows);
    });
  });
}

// Attempts to catch the pokemon
function catch_pokemon(message, db, current_pokemon) {
  return new Promise(function(resolve, reject) {
    // Check if the trainer has the pokemon
    db.query(
      `SELECT * 
            FROM trainer_pokemon tp, current_pokemon cp
            WHERE tp.trainer_id = ${message.author.id} 
            AND tp.pokemon_number = cp.number`,
      [message.author.id],
      (err, rows) => {
        // If they don't it will be added to their database
        if (rows.length == 0) {
          db.query(
            `INSERT INTO trainer_pokemon (trainer_id, pokemon_number) VALUES (?, ?);`,
            [message.author.id, current_pokemon.number],
            (err1, rows1) => {
              fs.appendFile(
                __dirname + "/../../log.txt",
                util.timestamp() +
                  `${message.author.username} caught ${
                    current_pokemon.name
                  }.\n`,
                err => {
                  if (err) throw err;
                }
              );
              console.log(
                `${message.author.username} caught ${current_pokemon.name}.`
              );
              message.author.send(
                `Congratulations! You have caught ${current_pokemon.name}!`
              );
            }
          );

          // Otherwise it returns this message
        } else {
          fs.appendFile(
            __dirname + "/../../log.txt",
            util.timestamp() +
              `${message.author.username} tried to catch ${
                current_pokemon.name
              }, but already has it.\n`,
            err => {
              if (err) throw err;
            }
          );
          console.log(
            `${message.author.username} tried to catch ${
              current_pokemon.name
            }, but already has it.`
          );
          message.author.send(`You already have ${current_pokemon.name}!`);
        }
      }
    );
  });
}

exports.run = async (message, db) => {
  // Error checking
  if (message.guild === null) {
    return;
  }
  if (message.author.bot) {
    return;
  }

  // Variable initialization
  let current_size;
  let current_pokemon;

  // Checks to see if there is currently a pokemon
  // Looks at the current pokemon, if it's not then it stops the function
  await get_current(message, db).then(rows => {
    current_size = rows.length;
    current_pokemon = rows[0];
  });

  // If there is currently no pokemon, it will send this
  if (current_size == 0) {
    fs.appendFile(
      __dirname + "/../../log.txt",
      util.timestamp() + `${message.author.username} tried to catch nothing.\n`,
      err => {
        if (err) throw err;
      }
    );
    console.log(`${message.author.username} tried to catch nothing.`);
    message.author.send("There is no pokemon currently!");
    if (message.guild != null) {
      message.delete(5000);
    }
    return;
  }

  // Checks to see if there is a trainer, makes one if not.
  await make_trainer(message, db);

  // Attempts to catch the pokemon
  catch_pokemon(message, db, current_pokemon);
  if (message.guild != null) {
    message.delete(5000);
  }
};
