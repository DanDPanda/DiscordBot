const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);

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
        console.log(`Updating ${player.username}.`);
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
        console.log(err);
      });
  }, i * 3000);
}

// This is run when it is called.
exports.run = async (bot, message, db, tools) => {
  // Make it update manually one more time before it awards
  let i = 1;
  db.query(`SELECT * FROM tracker ORDER BY difference DESC;`, (err, rows) => {
    rows.forEach(async element => {
      try {
        get_stats(db, element, i++);
      } catch (e) {
        console.log(`${element.username} could not be updated.`);
      }
    });
    setTimeout(() => {
      // This finds the player(s) with the highest win difference
      console.log(
        "Finished updating the players, now calculating the winner(s)."
      );
      db.query(
        "SELECT * FROM tracker WHERE difference = (SELECT MAX(difference) FROM tracker);",
        (err, rows) => {
          // This gets the awarded pokemon
          db.query("SELECT * FROM track_stats", (err, stats) => {
            // For each winner, they will get this pokemon as a reward
            var json = JSON.parse(message).poke[stats[0].week];
            let mess =
              `Congratulations for winning ${
                json.name
              } this week with a high of ${rows[0].difference} wins!\n` +
              "```\n";
            rows.forEach(async element => {
              db.query(
                "INSERT INTO trainer_pokemon (TRAINER_ID, pokemon_number) VALUES (?, ?)",
                [element.id, json.number]
              );
              console.log(`${element.username} has won ${json.name}!`);
            });

            // This shall construct the final timeboard.
            db.query(
              "SELECT * FROM tracker ORDER BY difference DESC;",
              (err, players) => {
                let j = 0;
                players.forEach(playa => {
                  if (j++ < rows.length) {
                    mess += `*${playa.username} = ${playa.difference}*\n`;
                  } else {
                    mess += `${playa.username} = ${playa.difference}\n`;
                  }
                });

                setTimeout(() => {
                  // The pokemon is then inserted into the database
                  if (json.evolution == "NULL") {
                    db.query(
                      "INSERT INTO pokemon (number, name, time, img, evolution) VALUES (?, ?, ?, ?, NULL)",
                      [json.number, json.name, json.time, json.img]
                    );
                  } else {
                    db.query(
                      "INSERT INTO pokemon (number, name, time, img, evolution) VALUES (?, ?, ?, ?, ?)",
                      [
                        json.number,
                        json.name,
                        json.time,
                        json.img,
                        json.evolution
                      ]
                    );
                  }
                  console.log(`${json.name} has been added to the database.`);
                  bot.channels.get("472986828014747679").send(mess + "\n```");
                }, players.length * 100);
              }
            );
          });
        }
      );
    }, rows.length * 3500);
  });
};
