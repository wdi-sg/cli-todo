console.log("********");

// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');
const file = 'data.json';
let commandType = process.argv[2];
let input1 = process.argv[3];

// // //****** Create toDoItems
// var createList = function(){
// jsonfile.readFile(file, (err, obj) => {

//       obj["toDoItems"]=[];

//       jsonfile.writeFile(file, obj, (err) => {
//         console.log(err)
//       });
//     });
// }

//*****************
var showInstructions = function(){
    console.log(`1. To add a to-do item to the list, please enter -add "XXX" \n2. To see the full list, please enter - show \n3. For mark a completed task, pls enter done and the number of the task - ie. done 4 \n 4.To permanently delete an item, pls enter delete and the number of the task - ie. delete 2`);
}

//*****************
var addItem = function (newItem) {

    jsonfile.readFile(file, (err, obj) => {

      obj["toDoItems"].push(`${obj["toDoItems"].length+1}. [ ] - ${newItem}`);
        console.log(obj["toDoItems"]);

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    });
}

//*****************
var showList = function () {

    jsonfile.readFile(file, (err, obj) => {

            let fullList = "";
            for (let i = 0; i < obj["toDoItems"].length; i++) {
                console.log(fullList = obj["toDoItems"][i]);
            }

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    });
}



//*****************
var markDoneItem = function (doneItem) {

    jsonfile.readFile(file, (err, obj) => {

        let itemNum = parseInt(doneItem)-1;
        let splitArr = obj["toDoItems"][itemNum].split("");
        splitArr[4] = "X";
        obj["toDoItems"][itemNum-1] = splitArr.join("");

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    });
}


//*****************
var deleteItem = function (itemToDelete) {

    jsonfile.readFile(file, (err, obj) => {

    // let itemNum = parseInt(itemToDelete)-1;
    // delete obj["toDoItems"][itemNum;
    //Above deletes item but leaves with a null at the entry and subsequent item no. don't change

    let itemIndex = parseInt(itemToDelete)-1;
    obj["toDoItems"].splice(itemIndex, 1);

    let arr=obj["toDoItems"];
    for (var i = itemIndex; i<arr.length; i++){
        let splitArr = arr[itemIndex].split("");
        splitArr[0] = itemIndex+1;
        obj["toDoItems"][itemIndex] = splitArr.join("");

    }

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    });
}



if(commandType === undefined){
    showInstructions();
}else{
      switch (commandType) {
        case "add":
            addItem(input1);
            break;
        case "show":
            showList();
            break;
        case "done":
            markDoneItem(input1);
            break;
        case "delete":
            deleteItem(input1);
            break;
        default:
            console.log("Something went wrong")
            break;
    }
}

// var checkCommand = function(){
//     switch (commandType) {
//         case "add":
//             addItem(input1);
//             break;
//         case "show":
//             showList();
//             break;
//         default:
//             console.log("Something went wrong")
//             break;
//     }
// }




// var checkIfEmpty = function(){
//     jsonfile.readFile(file, (err, obj) => {
//         if (obj === undefined){
//             console.log("empty");
//         } else if (obj !== undefined){
//             console.log("not empty");
//         }
//     });
// }


// if(commandType === undefined){
//     showInstructions();
// }else if (checkIfEmpty() === "empty"){
//     createList();
//     checkCommand();
// }else if (checkIfEmpty() === "not empty"){
//     checkCommand();
// }