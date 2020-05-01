const fs = require("fs");

const read = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    console.log(err);
  }
};

module.exports = read;
