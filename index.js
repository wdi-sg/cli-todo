const yargs = require('yargs');
//console.log(yargs.argv);

let command = yargs.argv._[0];
let params = yargs.argv;

/*if (command === "add"){
    if(params.no && params.detail){
        console.log(`${params.no} [] ${params.detail}`);
    }
}*/

const jsonfile = require('jsonfile');
const file = 'data.json';

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
if (command === "add"){
    if(params.no && params.detail){
  obj = {params.no : params.detail}
}
}
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});