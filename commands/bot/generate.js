const fs = require("fs");
const util = require("../../util");

// Creating the discord bot
const Discord = require("discord.js");

// Counts the size of the current pokemon table size
function get_current(db) {
  return new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM current_pokemon;`, (err, rows) => {
      resolve(rows);
    });
  });
}

// Creates the current pokemon and deletes it after a little
function generate_current(message, db) {
  // Randomly grabs a pokemon from the table
  db.query(
    `SELECT * FROM pokemon ORDER BY RAND() LIMIT 1;`,
    (err1, pokemon) => {
      //db.query(`SELECT * FROM pokemon WHERE number = 1;`, (err1, pokemon) => {

      // Text and picture are sent
      fs.appendFile(
        __dirname + "/../../log.txt",
        util.timestamp() +
          `${message.author.username} has caused ${
            pokemon[0].name
          } to appear for ${pokemon[0].time / 1000} seconds!\n`,
        err => {
          if (err) throw err;
        }
      );
      console.log(
        `${message.author.username} has caused ${
          pokemon[0].name
        } to appear for ${pokemon[0].time / 1000} seconds!`
      );
      message.channel
        .send(
          `${pokemon[0].name} has appeared for ${pokemon[0].time /
            1000} seconds! Type !catch to catch it!`
        )
        .then(msg => {
          msg.delete(pokemon[0].time);
        });
      message.channel.send({ files: [pokemon[0].img] }).then(msg => {
        msg.delete(pokemon[0].time);
      });

      // Values are inserted into the database temporarily
      // Inserts the pokemon into the table and deletes it after a short amount of time
      db.query(
        `INSERT INTO current_pokemon (number, name, time, img) VALUES (?, ?, ? ,?);`,
        [pokemon[0].number, pokemon[0].name, pokemon[0].time, pokemon[0].img],
        (err2, none) => {
          setTimeout(function() {
            fs.appendFile(
              __dirname + "/../../log.txt",
              util.timestamp() + `${pokemon[0].name} has disappeared!\n`,
              err => {
                if (err) throw err;
              }
            );
            console.log(`${pokemon[0].name} has disappeared!`);
            db.query(`DELETE FROM current_pokemon;`);
          }, parseInt(pokemon[0].time) + 1000);
        }
      );
    }
  );
}

// This spawns the pokemon on random
exports.run = async (message, db) => {
  // Error checking
  if (message.guild === null) {
    return;
  }
  if (message.author.bot) {
    return;
  }

  // Initialize the variables
  let total;

  // Looks at the current pokemon, if it's not there then make a new one
  await get_current(db).then(rows => {
    total = rows.length;
  });

  // Makes a random value for the lulz
  if (total == 0) {
    let guess = Math.floor(Math.random() * 10) + 1;
    if (guess == 1) {
      // Selects a random pokemon and adds it to the current list.
      await generate_current(message, db);
    }
  }
};
