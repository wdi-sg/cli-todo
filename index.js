// Initialisation

var commandType = process.argv[2];

console.log("Your command was: " + commandType);
const jsonfile = require('jsonfile');
const file = 'data.json'



// Helper Functions

function genListItem(arrayLength, listContent) {
 return `${arrayLength}. [ ] - ${listContent} created_at: ${Date(Date.now() * 1000)}`;
}

function changeListNumber(toDoList) {
  for (let i = 0; i < toDoList.length; i++) {
    toDoList[i] = (i + 1) + toDoList[i].substr(1);
  }

  return toDoList;
}

function addToList(listContent) {
  jsonfile.readFile(file, (error, data) => {
    if (error) {
      console.log("Error during read");
      return;
    }
    let arrayLength = data["arrayLength"];
    arrayLength++;

    data["toDoList"].push(genListItem(arrayLength, listContent));
    data["arrayLength"]++;

    jsonfile.writeFile(file, data, (error) => {
      if (error) {
        console.log("Error during write");
        return;
      }
    });
  });
}

function showList() {
  jsonfile.readFile(file, (error, data) => {
    const toDoList = data["toDoList"];

    for (let i = 0; i < toDoList.length; i++) {
      console.log(toDoList[i]);
    }
  });
}

function markDone(listIndex) {
  jsonfile.readFile(file, (error, data) => {
    if (error) {
      console.log("Error during read");
      return;
    }

    let listItem = data["toDoList"][listIndex-1];
    listItem = listItem.substr(0, 4) + "X" + listItem.substr(5) + ` updated_at: ${Date(Date.now() * 1000)}`;

    data["toDoList"][listIndex-1] = listItem;

    jsonfile.writeFile(file, data, (error) => {
      if (error) {
        console.log("Error during write");
        return;
      }
    });
  });
}

function removeFromList(listIndex) {
  jsonfile.readFile(file, (error, data) => {
    if (error) {
      console.log("Error during read");
      return;
    }

    const toDoList = data["toDoList"];
    toDoList.splice(listIndex-1, 1);
    changeListNumber(toDoList);

    data["toDoList"] = toDoList;

    jsonfile.writeFile(file, data, (error) => {
      if (error) {
        console.log("Error during write");
        return;
      }
    });
  });
}



// Console Display

if (commandType === "add") {
  addToList(process.argv[3]);
} else if (commandType === "show") {
  showList();
} else if (commandType === "done") {
  markDone(process.argv[3]);
} else if (commandType === "remove") {
  removeFromList(process.argv[3]);
}