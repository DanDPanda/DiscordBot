// Used to read files
const fs = require("fs");

// Creating the prefixes
const prefix = "!";
const fortnite_prefix = "!fort";
const poke_prefix = "!poke";

// Functions
function timestamp() {
  var d = new Date();
  var hour = ("0" + d.getHours()).slice(-2);
  var min = ("0" + d.getMinutes()).slice(-2);
  var sec = ("0" + d.getSeconds()).slice(-2);
  return `[` + hour + ":" + min + ":" + sec + `] `;
}

// This is what is run when the this function is called
exports.run = async (bot, message, database, tools) => {
  // Initialize Variables
  let commandFile;

  // Pokemon and coin conditions
  if (message.content.toLowerCase() == "!catch") {
    commandFile = require(`./bot/catch.js`);
    commandFile.run(bot, message, database);
    return;
  } else {
    commandFile = require(`./bot/generate.js`);
    commandFile.run(bot, message, database);
    commandFile = require(`./bot/gainEXP.js`);
    commandFile.run(bot, message, database);
  }

  // Command reading
  let msg = message.content.toLowerCase();
  let new_prefix;

  // Modify the prefix to be correct
  if (
    msg.startsWith(fortnite_prefix) &&
    message.channel.id != 472986828014747679 &&
    message.guild != null
  ) {
    console.log(`${message.author.username} used the fortnite commands in the wrong channel.`);
    message.author.send('Please use the fortnite commands in the "fortnite-stats" channel or this direct message.');
    message.delete(5000);
    return;
  } else if (msg.startsWith(fortnite_prefix)) {
    new_prefix = fortnite_prefix;
  } else if (msg.startsWith(poke_prefix)) {
    new_prefix = poke_prefix;
  } else if (msg.startsWith("!")) {
    new_prefix = prefix;
  } else {
    return;
  }

  // Gets the arguments and the command
  let args = message.content.slice(new_prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();

  // Atempt to run the commands
  try {
    let commandFile;
    if (new_prefix == fortnite_prefix && cmd == "tracker") {
      commandFile = require(`./fortnite/${cmd}.js`);
      args.push(database);
    } else if (new_prefix == fortnite_prefix) {
      commandFile = require(`./fortnite/${cmd}.js`);
    } else if (new_prefix == poke_prefix) {
      commandFile = require(`./poke/${cmd}.js`);
      args.push(database);
    } else if (new_prefix == "!") {
      commandFile = require(`./other/${cmd}.js`);
      args.push(database);
    }
    fs.appendFile(
      "log.txt",
      timestamp() + `${message.author.username} used ${new_prefix}${cmd}.\n`,
      err => {if (err) throw err;}
    );
    console.log(`${message.author.username} used ${new_prefix}${cmd}.`);
    commandFile.run(bot, message, args);
  } catch (e) {
    console.log(
      `${
        message.author.username
      } used ${new_prefix}${cmd}, but it did not work.`
    );
  }
};
