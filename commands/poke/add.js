// Creating the discord bot
const Discord = require("discord.js");

exports.run = async (bot, message, args, tools) => {
  var db = args[5];

  // Checks to see if the argument has the correct amount of args
  if (args.length != 6) {
    console.log(`Only ${args.length} arguments, not the correct amount!`);
    return;
  }

  // Error checking
  if (message.author.id != 130519896441356288) {
    console.log(
      `${message.author.username} attempted to use an illegal statement!`
    );
    return;
  }
  try {
    db.query(
      "SELECT * FROM pokemon WHERE number = ?;",
      [args[0]],
      (err, rows) => {
        // Create if not exists and evolution is null
        if (rows.length < 1 && args[4].toLowerCase() == "null") {
          db.query(
            "INSERT INTO pokemon (number, name, time, img, evolution) VALUES (?, ?, ?, ?, ?);",
            [args[0], args[1], args[2], args[3], null]
          );
          message.author.send(`${args[0]}. ${args[1]} was added successfully.`);
          console.log(`${args[0]}. ${args[1]} was added successfully.`);

          // Create if not exists
        } else if (rows.length < 1) {
          db.query(
            "INSERT INTO pokemon (number, name, time, img, evolution) VALUES (?, ?, ?, ?, ?);",
            [args[0], args[1], args[2], args[3], args[4]]
          );
          message.author.send(`${args[0]}. ${args[1]} was added successfully.`);
          console.log(`${args[0]}. ${args[1]} was added successfully.`);

          // Update if exists and no update
        } else if (args[4].toLowerCase() == "null") {
          db.query(
            `UPDATE pokemon 
                        SET number = ?,
                        name = ?,
                        time = ?,
                        img = ?,
                        evolution = ?
                        WHERE number = ?;`,
            [args[0], args[1], args[2], args[3], null, args[0]]
          );
          message.author.send(`${args[0]}. ${args[1]} was added successfully.`);
          console.log(`${args[0]}. ${args[1]} was added successfully.`);

          // Update if exists
        } else {
          db.query(
            `UPDATE pokemon 
                        SET number = ?,
                        name = ?,
                        time = ?,
                        img = ?,
                        evolution = ?
                        WHERE number = ?;`,
            [args[0], args[1], args[2], args[3], args[4], args[0]]
          );
          message.author.send(`${args[0]}. ${args[1]} was added successfully.`);
          console.log(`${args[0]}. ${args[1]} was added successfully.`);
        }
      }
    );
  } catch (e) {
    console.log(
      `${message.author.username} used the add function incorrectly.`
    );
  }
};
