// Creating the discord bot
const Discord = require("discord.js");
const bot = new Discord.Client();
const mysql = require("mysql");
const fs = require("fs");
const util = require("./util");
const cron = require("node-cron");
require('dotenv').config();

console.log("Time Start: " + new Date());

// Schedule to ping every day
cron.schedule("0 0 * * *", function() {
  util.daily();
});

// Schedule to reset the tracker every week
cron.schedule("0 0 * * 1", function() {
  console.log("\nStarting winning calculations");
  try {
    var contents = fs.readFileSync("./rewards.json", "utf8");
    commandFile = require(`./commands/bot/award.js`);
    commandFile.run(bot, contents, database);
  } catch (e) {
    console.log("Cannot access the JSON file.");
    console.log(e);
  }
  database.query(
    `SELECT * FROM tracker ORDER BY difference DESC;`,
    (err, rows) => {
      setTimeout(() => { 
        console.log("Resetting the tracker stats.");
        commandFile = require(`./commands/bot/reset.js`);
        commandFile.run(bot, database);
      }, rows.length * 4000);
    }
  );
});

bot.on("error", e => {});
bot.on("warn", e => {});

// Connect to the database
var database = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  database: process.env.SQLDB,
  pingInterval: 60000
});

// Connect to the DB
try {
  // Connect the database
  database.connect(err => {
    if (err) {
      throw err;
    }
    console.log("Connected to database.");
    database.query("DELETE FROM current_pokemon;");
  });
} catch (e) {
  setTimeout(function() {
    console.log("MariaDB is down.");
  }, 1000);
}

// Pings the SQL server every hour
setInterval(function() {
  database.query("SELECT 1");
}, 3600000);

// Message the bot displays when ready
bot.on("ready", () => {
  console.log("Bot Online");
  bot.user.setActivity("the sounds of the ocean", { type: 2 });
});

// This reads the message and sends the appropriate command
bot.on("message", message => {
  let commandFile = require(`./commands/message.js`);
  commandFile.run(bot, message, database);
});

// Logs into the discord
try {
  bot.login(process.env.DISCORD);
} catch (e) {
  setTimeout(function() {
    console.log("Discord is down.");
  }, 1000);
}
