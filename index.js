console.log("Command: ", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

const obj = {
    "todoItems": []
}

jsonfile.readFile(file, (err, obj) => {

  let array = obj["todoItems"];

        if (process.argv[2] === "add") {
           array.push((array.length+1) +". [ ] - "+ process.argv[3]);
           console.log((array.length) +". [ ] - "+ process.argv[3]);
      } if (process.argv[2] === "show") {
              array.forEach(function(i){
                  console.log(i);
              });
      } if (process.argv[2] === "done") {
            var number = parseInt(process.argv[3]) - 1;
            var item = obj["todoItems"][number];
            var newItem = item.replace("[ ]","[x]");
            array.splice(number, 1, newItem);

            // var re = /[ ]/gi;
            // var str = obj["todoItems"][number];
            // var newstr = str.replace(re, '[x]');

            array.forEach(function(i){
                  console.log(i);
              });
      }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});