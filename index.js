console.log("Command: ", process.argv[2]);

var commandType = process.argv[2];

// console.log(" "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

const obj = {
    "todoItems": [],
}

const art = "  _            _       \n | |_ ___   __| | ___  \n | __/ _ \\ / _` |/ _ \\ \n | || (_) | (_| | (_) | \n  \\__\\___/ \\__,_|\\___/ \n";

const artTwo = "           *-*,\n       ,*\\/|`| \\\n       \\'  | |'| *,\n        \\ `| | |/ )\n         | |'| , /\n         |'| |, /\n       __|_|_|_|_\n      [___________]\n       |         |\n       |  VAL'S  |\n       |  TODO   |\n       |  LIST   |\n       |_________|";

jsonfile.readFile(file, (err, obj) => {

      let array = obj["todoItems"];

      var show = function(){
            console.log(artTwo);
             for (var i = 0; i < array.length; i++) {
                  console.log(i+1 + array[i]);
             }
       };

        if (process.argv[2] === "add") {

            var createdAt = new Date();

            // not adding list index no. here so that it's easier to print list later when items are deleted later
           array.push(". [ ] - "+ process.argv[3] + " "+ createdAt);

           console.log((array.length) +". [ ] - "+ process.argv[3]);

      } if (process.argv[2] === "show") {

            show();

      } if (process.argv[2] === "done") {
            var number = parseInt(process.argv[3]) - 1;
            var item = obj["todoItems"][number];
            var newItem = item.replace("[ ]","[x]");
            array.splice(number, 1, newItem);

            show();

      } if (process.argv[2] === "delete") {
            var number = parseInt(process.argv[3]) - 1;
            array.splice(number, 1);

            show();

      }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});