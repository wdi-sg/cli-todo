const fs = require("fs");

const write = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = write;
