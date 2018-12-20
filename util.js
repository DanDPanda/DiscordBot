const fs = require("fs");

module.exports = {
  daily: () => {
    var today = new Date();
    fs.appendFile(
      "log.txt",
      timestamp() +
        `Date: ` +
        (parseInt(today.getMonth()) + 1) +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear() +
        "\n",
      err => {
        if (err) throw err;
      }
    );
    console.log(
      "Date: " +
        (parseInt(today.getMonth()) + 1) +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear()
    );
  },

  timestamp: () => {
    var d = new Date();
    var hour = ("0" + d.getHours()).slice(-2);
    var min = ("0" + d.getMinutes()).slice(-2);
    var sec = ("0" + d.getSeconds()).slice(-2);
    return `[` + hour + ":" + min + ":" + sec + `] `;
  }
};
