// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

var itemsType = process.argv[2];
var value = process.argv[3];
console.log("working!!")

if (itemsType === "add") {
	
}
let totalItems = itemsArray.length-1;
let selectedItems = process.argv[itemNumber];
let chosenItemNumber = function() {

}
console.log("appplee")

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  // obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
console.log(file);
