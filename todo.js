const jsonfile = require('jsonfile');

const file = 'data.json';

var addToList = (task)=>{
 jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj["todoItems"].push(task);
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
  });
});
}