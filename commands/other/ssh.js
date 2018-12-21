exports.run = async (bot, message, args, db) => {
    if (message.author.id == "130519896441356288") {
        db.query("SELECT * FROM ngrok", (err, rows) => {
            message.channel.send(`${rows[0].ssh}`);
        });
    }
}