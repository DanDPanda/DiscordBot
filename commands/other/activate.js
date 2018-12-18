exports.run = async (bot, message, db, tools) => {
    let database = db[0];
    if (message.author.id == "130519896441356288") {
        database.query("SELECT * FROM ngrok", (err, rows) => {
            if (rows[0].online == 0) {
                database.query("UPDATE ngrok SET online = 1;");
                message.author.send("SSH turned on.");
            } else {
                database.query("UPDATE ngrok SET online = 0;");
                message.author.send("SSH turned off.");
            }
        });
    }
}