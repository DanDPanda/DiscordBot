// Creating the discord bot
const Discord = require("discord.js");

// Function gets to see if there is an evolved pokemon
function check_evolution(message, args) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `SELECT p.name, p.evolution FROM trainer t, pokemon p WHERE ? = t.id AND t.number = p.number;`,
      [message.author.id],

      (err, rows) => {
        // Empty if the evolution doesn't exist
        resolve(rows);
      }
    );
  });
}

// Function gets to see if the trainer has the evolved pokemon
function check_trainer(message, args) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `SELECT p.name, p.evolution 
            FROM trainer t, pokemon p, trainer_pokemon tp 
            WHERE ? = t.id 
            AND t.number = p.number 
            AND tp.pokemon_number = p.evolution 
            AND tp.trainer_id = ?;`,
      [message.author.id, message.author.id],
      (err, rows) => {
        // Empty if the trainer does not have
        resolve(rows);
      }
    );
  });
}

// Function gets the information of the current pokemon
function get_pokemon_info(message, args) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `SELECT p.name, p.number, p.evolution, p.time FROM pokemon p, trainer t WHERE ? = t.id AND t.number = p.number;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Function gets the information of the evolved pokemon
function get_evolved_info(args, evolved) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `SELECT name, number, time FROM pokemon WHERE ? = number;`,
      [evolved],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Function adds the evolved pokemon into their roster
function evolve(message, args, evolved) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `INSERT INTO trainer_pokemon (trainer_id, pokemon_number) VALUES (?, ?);`,
      [message.author.id, evolved[0].number],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Checks whether the trainer has enough exp
function get_exp(message, args) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `SELECT exp FROM trainer WHERE ? = id;`,
      [message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

// Deduct EXP
function deduct_exp(message, args, amount) {
  return new Promise(function(resolve, reject) {
    args[0].query(
      `UPDATE trainer SET exp = ? WHERE ? = id;`,
      [amount, message.author.id],
      (err, rows) => {
        resolve(rows);
      }
    );
  });
}

exports.run = async (bot, message, args, tools) => {
  // Command has to be !pokevolve
  if (args.length === 1) {
    // Initialize the variables
    let current;
    let exp;
    let evolved;

    // Checks to see if the pokemon can evolve
    await check_evolution(message, args).then(rows => {
      current = rows;
    });
    try {
      if (current[0].evolution == null) {
        console.log(
          `${message.author.username} tried to evolve ${
            current[0].name
          }, but there are no evolutions.`
        );
        message.author.send("There is no evolution!");
        if (message.guild != null) {
          message.delete(5000);
        }
        return;
      }
    } catch (e) {
      return;
    }

    // Checks to see if the trainer already has the pokemon
    await check_trainer(message, args).then(rows => {
      current = rows;
    });
    if (current.length != 0) {
      console.log(
        `${message.author.username} tried to evolve ${
          current[0].name
        }, but they already have the evolution.`
      );
      message.author.send("You already have the evolved pokemon!");
      if (message.guild != null) {
        message.delete(5000);
      }
      return;
    }

    // Gets the current pokemon's information
    await get_pokemon_info(message, args).then(rows => {
      current = rows;
    });

    // Gets evolved pokemon's information
    await get_evolved_info(args, current[0].evolution).then(rows => {
      evolved = rows;
    });

    // Checks if the user has the correct amount of EXP
    await get_exp(message, args).then(rows => {
      exp = rows[0].exp - (1000000 / parseInt(current[0].time)).toFixed(0);
    });

    // If so, evolve the pokemon, if not, then stop.
    if (exp >= 0) {
      console.log(
        `${message.author.username} evolved ${current[0].number}.${
          current[0].name
        } into ${evolved[0].number}.${evolved[0].name}!`
      );
      await deduct_exp(message, args, exp);
      await evolve(message, args, evolved);
    } else {
      console.log(
        `${message.author.username} doesn't have enough EXP to evolve ${
          current[0].name
        }.`
      );
      message.author.send("You don't have enough EXP to evolve!");
      if (message.guild != null) {
        message.delete(5000);
      }
      return;
    }

    // Gets the evolution number
    message.author.send(
      `Congratulations! You have evolved **${current[0].number}.${
        current[0].name
      }** into **${evolved[0].number}.${evolved[0].name}**!`
    );
    if (message.guild != null) {
      message.delete(5000);
    }
  }
};
