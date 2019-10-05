let commandType = process.argv[2];

let listItem = process.argv[3];

console.log(`Your command was: ${commandType} ${listItem}`);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  switch (commandType) {
    case 'add':
        obj['todoItems'].push(listItem);
        console.log('your wish is my command');
        break;
    case 'show':
        for (let i=0; i<obj['todoItems'].length; i++) {
            let formatOutput = `${i+1}. [ ] - ${obj["todoItems"][i]}`
            console.log(formatOutput);
        };
        break;
    default:
        console.log('invalid command');
        break;
  };

  jsonfile.writeFile(file, obj, (err) => {
    console.log(`errors: ${err}`)
  });
});