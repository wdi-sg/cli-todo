
const jsonfile = require('jsonfile');

const file = 'data.json'

if(process.argv[2] === "add"){
    jsonfile.readFile(file, (err, obj) => {

      obj["toDoItems"].push(obj["toDoItems"].length + ". [ ] - " + process.argv[3] + " | created_at: " + Date());

      if(err){
        console.log(err);
      }

      jsonfile.writeFile(file, obj, (error) => {
        console.log(obj);
        console.log(error)
      });
    });
}

if(process.argv[2] === "done"){
    jsonfile.readFile(file, (err, obj) => {

        // Mark X in the bracket of item that is done
        const item = obj["toDoItems"][process.argv[3]];
        itemSplit = item.split(' ')
        itemSplit.splice(2, 0, 'X');
        console.log(itemSplit);

        // Join back array into full string
        newObj = itemSplit.join(' ');


        // Change obj to reflect new object
        obj["toDoItems"][process.argv[3]] = newObj;

        jsonfile.writeFile(file, obj, (error) => {
            console.log(obj);
            console.log(error);
        })
    })
}

console.log(Date.now())