console.log("works!!", process.argv[2]);

var addTdl = process.argv[2];

console.log("Your command was: "+ addTdl);

const jsonfile = require('jsonfile');

const file = 'data.json'

const tdl = "todolist";

jsonfile.readFile(file, (err, obj) => {
  listcounter = 0;
  if (process.argv[2] === tdl){
    obj[tdl] = [];
  };
  const additem= function (){
  if(process.argv[2] === "add"){
    obj[tdl].push(process.argv[3]);
  }
};
  additem();

  console.log(obj);

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
