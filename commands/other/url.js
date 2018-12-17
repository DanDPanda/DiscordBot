exports.run = async (bot, message, db, tools) => {
    let database = db[0];
    database.query("SELECT * FROM ngrok", (err, rows) => {
        message.channel.send(`${rows[0].url}`);
    });
}