exports.run = async (bot, message, db, tools) => {
    let database = db[0];
    if (message.author.id == "130519896441356288") {
        database.query("SELECT * FROM ngrok", (err, rows) => {
            message.channel.send(`${rows[0].ssh}`);
        });
    }
}