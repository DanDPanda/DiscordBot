exports.run = async (bot, message, args, db) => {
    db.query("SELECT * FROM ngrok", (err, rows) => {
        message.channel.send(`${rows[0].url}`);
    });
}