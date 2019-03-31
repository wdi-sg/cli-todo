const jsonfile = require('jsonfile');
const file = 'data.json';

var commandType = process.argv[2];

console.log("Your command was: "+commandType + process.argv[3]);

if (commandType === 'add') {jsonfile.readFile(file, (err, obj) => {
var counter = 0;
for (key in obj){
	counter++;
}
var nextKey = counter +1;
obj[nextKey]=process.argv[3];

  console.log(nextKey + '. ' + '[ ] ' + '- ' + process.argv[3]);

  
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
}

// function todolist() {
//   var list = {1:{bracket:"[ ] ", todo:"eat baka teh"}};  
//   var text = "";
//   var x;

//   for (x in list) {
//     text += x + ". " + list[x].bracket + list[x].todo + " ";
//   }

