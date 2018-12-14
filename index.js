const jsonfile = require('jsonfile');
const file = 'data.json';

let commandType = process.argv[2];

const argArray = [];

for (let i = 0; i < process.argv.length; i++) {
  if (i > 2) {
    argArray.push(process.argv[i]);

  }
  // console.log(argArray)
}


const runApp = () => {
  switch (commandType) {
    case 'show':
      showList();
      break;
    case 'add':
      addList();
      break;
    case 'done':
      doneList();
      break;
    case 'remove':
      removeList();
      break;
      default:
      displayHelp();
  }

}

const displayHelp = () => {
  console.log("Use 'show','add','done' or 'remove' without qoutations. "+
  "For add, enter any sentence or word after the add argument. "+
  "For done, enter any list numbers to marked as done. "+
  "For remove, enter any list numbers to delete permanently from list."
  )
}


const showList = () => {
  jsonfile.readFile(file, (err, obj) => {
    for (let item in obj) {
      console.log(obj[item])
    }

  });
}

const addList = () => {
  jsonfile.readFile(file, (err, obj) => {
    let listLength = Object.keys(obj).length;
    let string = `${listLength+1}. [ ] - `;
    if (argArray[0]) {
      for (i = 0, n = argArray.length; i < n; i++) {
        string += `${argArray[i]} `;

      }
      obj[`${listLength + 1}`] = `${string}`;
    }
    for (let item in obj) {
      console.log(obj[item])
    }
    jsonfile.writeFile(file, obj, () => {});
  });
};
const doneList = () => {
  jsonfile.readFile(file, (err, obj) => {
    let listLength = Object.keys(obj).length;
    if (argArray[0]) {
      for (i = 0, n = argArray.length; i < n; i++) {
        let listNumber = parseInt(argArray[i]);
        if (listNumber < listLength) {
          let listString = obj[listNumber];
          listString = listString.replace(' [ ] ', ' [X] ');
          obj[`${listNumber}`] = `${listString}`;
        }
      }
    }
    for (let item in obj) {
      console.log(obj[item])
    }
    jsonfile.writeFile(file, obj, () => {});

  })
};
const removeList = () => {
  jsonfile.readFile(file, (err, obj) => {
    let listLength = Object.keys(obj).length;
    if (argArray[0]) {
      for (i = 0, n = argArray.length; i < n; i++) {
        let listNumber = parseInt(argArray[i]);
        if (listNumber <= listLength) {
          delete obj[listNumber];
        }
      }
    }
    listLength = Object.keys(obj).length;
    objKeyArray = Object.keys(obj);
    for (i = 0; i < listLength; i++) {
      let string = obj[objKeyArray[i]];
      string = string.replace(`${objKeyArray[i]}`, `${i+1}`);
      delete obj[objKeyArray[i]];
      obj[`${i+1}`] = string;
      console.log(obj[i + 1]);
    }
    jsonfile.writeFile(file, obj, () => {});
  })
}
runApp();