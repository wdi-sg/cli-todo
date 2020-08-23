const jsonfile = require('jsonfile');

const file = 'data.json';

const ENV = process.argv[0];
const PATH = process.argv[1];
const operator = process.argv[2];
let todoActions = process.argv.slice(3);

let newDate = new Date();
let date = newDate.toLocaleDateString();

if ( operator === 'add' ) {

  let todoActions = process.argv.slice(3);

  jsonfile.readFile ( file, (err, obj) => {

    todoActions.forEach ( item => {
      let todoItems = obj["todoItems"];
      let output = `. [ ] - ${item} Created at: ${date}`;
      todoItems.push(output);
      console.log(todoItems);
    })

    
    jsonfile.writeFile ( file, obj, (err) => {
      if (err) throw err;
    })
  })
}

else if ( operator === 'show' ) {
  jsonfile.readFile ( file, (err, obj) => {
    let todoItems = obj["todoItems"];
    
    todoItems.forEach( (item, index) => {
      let output = `${index + 1}${item}`;
      console.log(output);
    })
  })
}

else if ( operator === 'done' ) {
  let selectedNum = process.argv[3];

  jsonfile.readFile ( file, (err, obj) => {
    let todoItems = obj["todoItems"];

    let itemDone = todoItems[selectedNum-1].replace("[ ]", "[X]") + ", Updated at: " + date;
    todoItems.splice( (selectedNum-1), 1 , itemDone);

    todoItems.forEach( (item, index) => {
      let output = `${index + 1}${item}`;
      console.log(output);
    })

    jsonfile.writeFile ( file, obj, (err) => {
      if (err) throw err;
    })

  })
}

else if ( operator === 'delete' ) {
  let selectedNum = process.argv[3];

  jsonfile.readFile ( file, (err, obj) => {
    let todoItems = obj["todoItems"];

    todoItems.splice( (selectedNum-1), 1 );

    todoItems.forEach( (item, index) => {
      let output = `${index + 1}${item}`;
      console.log(output);
    })

    jsonfile.writeFile ( file, obj, (err) => {
      if (err) throw err;
    })

  })
}