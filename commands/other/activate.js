exports.run = async (bot, message, args, db) => {
    if (message.author.id == "130519896441356288") {
        db.query("SELECT * FROM ngrok", (err, rows) => {
            if (rows[0].online == 0) {
                db.query("UPDATE ngrok SET online = 1;");
                message.author.send("SSH turned on.");
            } else {
                db.query("UPDATE ngrok SET online = 0;");
                message.author.send("SSH turned off.");
            }
        });
    }
}