const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);
const fs = require("fs");

// Creates the message
function make_message(message, db) {
  try {
    var contents = fs.readFileSync(
      __dirname + "/../../rewards.json",
      "utf8"
    );
  } catch (e) {
    console.log(e);
    console.log("Cannot access the JSON file.");
    return;
  }
  db.query(`SELECT * FROM tracker ORDER BY difference DESC;`, (err, rows) => {
    db.query("SELECT * FROM track_stats;", (err, stats) => {
      let mess;
      try {
        mess =
        "**Total wins of week " +
        stats[0].date +
        "**\n**Reward for being #1 this week: " +
        JSON.parse(contents).poke[stats[0].week].name +
        "**\n(Stats reset on Monday at 12:00AM, message Dink if you would like to be added/removed)\n```";
      } catch (e) {
        mess =
        "**Total wins of week " +
        stats[0].date +
        "**\n**Reward for being #1 this week: NULL**\n" +
        "(Stats reset on Monday at 12:00AM, message Dink if you would like to be added/removed)\n```";
      }
      let i = 1;
      rows.forEach(element => {
        mess += `${i++}. ${element.username} = ${element.difference}\n`;
      });
      message.channel.send(mess + "```");
    });
  });
}

// Update the db to have new wins
function get_stats(db, player, i) {
  setTimeout(() => {
    // Exception names
    let epic;
    if (player.epic == "?lo?") {
      epic = "Βloο";
    } else {
      epic = player.epic;
    }

    // Getting the data and updating it
    let data = ft
      .user(epic, player.platform)
      .then(data => {
        db.query(`UPDATE tracker SET current = ? WHERE id = ?;`, [
          data.stats.lifetime[8].Wins,
          player.id
        ]);
        db.query(`UPDATE tracker SET difference = current-last WHERE id = ?;`, [
          player.id
        ]);
      })
      .catch(err => {
        console.log(`Could not update ${player.username}'s database.`);
      });
  }, i * 3000);
}

// OOF this code was a pain in the butt
// It was tough getting the "make_message()" to run right
// Gets all the players, updates them, and sends the message
exports.run = async (bot, message, args, db) => {
  let i = 1;

  db.query(`SELECT * FROM tracker ORDER BY difference DESC;`, (err, rows) => {
    if (rows.length == 0) {
      return;
    }

    rows.forEach(async element => {
      try {
        get_stats(db, element, i++);
      } catch (e) {
        console.log(`${element.user} could not be updated.`);
      }
    });
    setTimeout(() => {
      make_message(message, db);
    }, rows.length * 3500);
  });
};
