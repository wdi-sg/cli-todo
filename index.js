
console.log("Command: ", process.argv[2]);

var commandType = process.argv[2];

// console.log(" "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

const obj = {
    "todoItems": [],
}

const art = "  _            _       \n | |_ ___   __| | ___  \n | __/ _ \\ / _` |/ _ \\ \n | || (_) | (_| | (_) | \n  \\__\\___/ \\__,_|\\___/ \n";

jsonfile.readFile(file, (err, obj) => {

      let array = obj["todoItems"];

      var show = function(){
            // console.log(art);
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
    console.log("Yay!")
  });
});

// function todolist() {
//   var list = {1:{bracket:"[ ] ", todo:"eat baka teh"}};
//   var text = "";
//   var x;

//   for (x in list) {
//     text += x + ". " + list[x].bracket + list[x].todo + " ";
//   }

  // obj["todoItems"] = [{"id":"2", "done":"false", "item":"feed dog"}];