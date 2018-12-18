/*console.log("works!!", process.argv[2]);

console.log("Your command was: "+commandType);
*/
const jsonfile = require('jsonfile');
const file = 'data.json'
var commandType = process.argv[2];

const newTasks = [];

console.log("Running ");

for(let i = 0; i < process.argv.length; i++)
{

}

jsonfile.readFile(file, (err, obj) => {
    let newItem;
    jsonfile.write(file, obj, (err) => {
        console.log(err);

    });
});


/*if(commandType === 'addItem') {
    jsonfile.addItem(argv.item);
} else {
    console.log("invalid");
}

var addItem = (item) => {
    var jsonfile = [];
    var todo = {
        item
    };

    try {
        var jsonfile = file.readFileSync('data.json');
        items = JSON.parse()
    } catch (e) {

}*/
/*jsonfile.readFile(file, (err, obj) => {
  console.log(obj);
  obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});*/