exports.run = (bot, db, tools) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  // SQL Query
  console.log("Tracker being reset.");
  db.query("UPDATE tracker SET last = current;");
  db.query("UPDATE tracker SET difference = 0;");

  //Updates the weekly thing.
  console.log("Award pokemon being updated.");
  db.query("UPDATE track_stats SET week = week + 1;");
  db.query("UPDATE track_stats SET date = ?", [today]);

  console.log("Done!\n");
};
