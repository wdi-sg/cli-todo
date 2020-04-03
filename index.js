
const jsonfile = require('jsonfile');

const file = 'data.json'

if(process.argv[2] === "add"){
    jsonfile.readFile(file, (err, obj) => {

      obj["toDoItems"].push(process.argv[3]);

      if(err){
        console.log(err);
      }

      jsonfile.writeFile(file, obj, (error) => {
        console.log(obj);
        console.log(error)
      });
    });
}