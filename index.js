const jsonfile = require('jsonfile');
const file = 'data.json';
let userFuncInput = process.argv[2];
let userOptInput = process.argv[3];

const stylezz = () => {
console.log(`
  /$$$$$$                      /$$      /$$                                      
/$$__  $$                     | $$     | $/                                      
| $$  \\__/  /$$$$$$   /$$$$$$$| $$$$$$$|_//$$$$$$$                               
| $$       |____  $$ /$$_____/| $$__  $$ /$$_____/                               
| $$        /$$$$$$$|  $$$$$$ | $$  \\ $$|  $$$$$$                                
| $$    $$ /$$__  $$ \\____  $$| $$  | $$ \\____  $$                               
|  $$$$$$/|  $$$$$$$ /$$$$$$$/| $$  | $$ /$$$$$$$/                               
\\______/  \\_______/|_______/ |__/  |__/|_______/                                
                                                                                
                                                                                
                                                                                
/$$$$$$$$                /$$$$$$$                   /$$$$$$                     
|__ $$__/               | $$__  $$                 /$$__  $$                    
  | $$  /$$$$$$         | $$  \\ $$  /$$$$$$       | $$  \\ $$  /$$$$$$   /$$$$$$ 
  | $$ /$$__  $$ /$$$$$$| $$  | $$ /$$__  $$      | $$$$$$$$ /$$__  $$ /$$__  $$
  | $$| $$  \\ $$|______/| $$  | $$| $$  \\ $$      | $$__  $$| $$  \\ $$| $$  \\ $$
  | $$| $$  | $$        | $$  | $$| $$  | $$      | $$  | $$| $$  | $$| $$  | $$
  | $$|  $$$$$$/        | $$$$$$$/|  $$$$$$/      | $$  | $$| $$$$$$$/| $$$$$$$/
  |__/ \\______/         |_______/  \\______/       |__/  |__/| $$____/ | $$____/ 
                                                            | $$      | $$      
                                                            | $$      | $$      
                                                            |__/      |__/      
                                                            `)};

const show = (userOptInput) => {
  jsonfile.readFile(file, (err, obj) => {
    for (let i=0; i<obj.todoItems.length; i++) {
      console.log(`
      ${obj.indexItems[i]}. [${obj.markItems[i]}] - ${obj.todoItems[i]}
      Added on: ${obj.createdItems[i]}
      Marked on: ${obj.updatedItems[i]}
      `);
    };
  });
};
                                                            
const add = (userOptInput) => {
  jsonfile.readFile(file, (err, obj) => {

    obj.indexItems.push(obj.indexItems.length + 1)
    obj.todoItems.push(userOptInput)
    obj.markItems.push(" ")
    obj.createdItems.push(Date());
    obj.updatedItems.push("N.A.");

    jsonfile.writeFile(file, obj, (err) => {
      if (err) { console.log(err) };
    });
    console.log("New To-Do list added!")
    show();
  });
};

const mark = (userOptInput) => {
  jsonfile.readFile(file, (err, obj) =>{

    obj.markItems[userOptInput - 1] = "X";
    obj.updatedItems[userOptInput - 1] = Date();
    
    jsonfile.writeFile(file, obj, (err) => {
      if (err) { console.log(err) };
    });
    console.log("To-Do item is marked!")
    show();
  });
};

const del = (userOptInput) => {
  jsonfile.readFile(file, (err, obj) => {
    
    let deleted = userOptInput - 1;

    obj.indexItems.splice(deleted,1);
    obj.todoItems.splice(deleted,1);
    obj.markItems.splice(deleted,1);
    obj.createdItems.splice(deleted,1);
    obj.updatedItems.splice(deleted,1);

    for (let i=deleted; i<obj.indexItems.length; i++) {
      obj.indexItems[i] -= 1;
    };

    jsonfile.writeFile(file, obj, (err) => {
      if (err) { console.log(err) };
    });
    console.log("To-Do item have been permanently deleted.")
    show();
  });
};

if (userFuncInput == "add") {
  add(userOptInput);
} else if (userFuncInput == "show") {
  stylezz();
  show();
} else if (userFuncInput == "mark") {
  mark(userOptInput);
} else if (userFuncInput == "del") {
  del(userOptInput);
} else {
  console.log(`
  Please input in the following format:
  "node index.js * **"

  * = to replace with "add" / "mark" / "del" / "show"
  ** = for "add", input to-to description with quotes, e.g.[  node index.js add "buy food"  ]
  ** = for "mark", input list item no. to be marked,   e.g.[  node index.js mark 3          ]
  ** = for "del", input list item no. to be deleted,   e.g.[  node index.js del 3           ]
  ** = for "show", no secondary input needed,          e.g.[  node index.js show            ]
  `);
};