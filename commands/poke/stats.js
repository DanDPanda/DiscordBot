// Creating the discord bot
const Discord = require("discord.js");

// Function gets the total amount of pokemon
function get_total(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM pokemon;`, (err, rows) => {
      resolve(rows);
    });
  });
}

// Function gets the trainer's current amount of pokeon
function get_current(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(
      `SELECT * FROM trainer_pokemon tp WHERE tp.trainer_id = ?;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Function gets the pokemon's image from the trainer
function get_pokemon(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(
      `SELECT p.number, p.name, p.img FROM trainer t, pokemon p WHERE t.id = ? AND t.number = p.number;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Function gets the trainer's EXP
function get_trainer_exp(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(
      `SELECT exp FROM trainer WHERE id = ?;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Function gets the pokemon's amount of exp require to evolve
function get_pokemon_exp(message, db) {
  return new Promise(function(resolve, reject) {
    db.query(
      `SELECT p.time, p.evolution 
                    FROM pokemon p, trainer t 
                    WHERE t.id = ?
                    AND t.number = p.number;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

exports.run = async (bot, message, args, db) => {
  // Command has to be !pokestats
  if (args.length === 0) {
    // Initialize the variables
    let total;
    let current;
    let poke;
    let trainer_exp;
    let pokemon_exp;

    // Counts the total number
    await get_total(message, db).then(rows => {
      total = rows.length;
    });

    // Counts the number of pokemon the trainer has
    await get_current(message, db).then(rows => {
      current = rows.length;
    });

    // Gets the trainer's current pokemon's image
    await get_pokemon(message, db).then(rows => {
      if (rows.length != 0) {
        poke = rows[0];
      }
    });

    // Gets the trainer's current exp
    await get_trainer_exp(message, db).then(rows => {
      if (rows.length != 0) {
        trainer_exp = rows[0];
      }
    });

    // Gets the exp required to evolve the pokemon
    await get_pokemon_exp(message, db).then(rows => {
      if (rows.length != 0) {
        pokemon_exp = rows[0];
      }
    });
    if (pokemon_exp == null) {
      pokemon_exp = `undefined`;
    } else if (pokemon_exp.evolution == null) {
      pokemon_exp = `${trainer_exp.exp}`;
    } else {
      pokemon_exp = `${trainer_exp.exp}/${(
        1000000 / parseInt(pokemon_exp.time)
      ).toFixed(0)}`;
    }

    // Creates the embed
    const embed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setAuthor(
        `Professor Oak`,
        "https://pbs.twimg.com/profile_images/2927846251/bf8cef29642aceb034d4b01ab29a4ca7_400x400.png"
      )
      .setTitle(`${message.author.username}'s Pokestats`)
      .setThumbnail(message.author.avatarURL)
      .setImage(poke.img)
      .setFooter(
        `"Try to catch them all!"`,
        "https://cdn4.iconfinder.com/data/icons/longico/224/longico-23-512.png"
      )
      .addField("Total Pokemon Caught", `${current}/${total}`, true)
      .addField(
        "Percentage Caught",
        `${((current / total) * 100).toFixed(0)}%`,
        true
      )
      .addField("Current Pokemon", `${poke.number}. ${poke.name}`, true)
      .addField("Experience Points", pokemon_exp, true);
    message.channel.send(embed);
  }
};
