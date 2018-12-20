// Creating the discord bot
const Discord = require("discord.js");

// Function
exports.run = (message, db) => {
  // Error Checking
  if (message.guild === null) {
    return;
  }
  if (message.author.bot) {
    return;
  }

  // SQL Query
  db.query(
    "SELECT * FROM trainer WHERE id = ?;",
    [message.author.id],
    (err, rows) => {
      if (err) {
        throw err;
      }

      // Create if not exists
      if (rows.length < 1) {
        db.query(
          "INSERT INTO trainer (id, number, exp, nickname) VALUES (?, NULL, 1, ?);",
          [message.author.id, message.author.username]
        );

        // Update if exists
      } else {
        db.query("UPDATE trainer SET exp = ? WHERE id = ?;", [
          parseInt(rows[0].exp) + 1,
          message.author.id
        ]);
        db.query("UPDATE trainer SET nickname = ? WHERE id = ?;", [
          message.author.username,
          message.author.id
        ]);
      }
    }
  );
};
