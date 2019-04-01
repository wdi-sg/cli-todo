// /console.log(process.argv);
const today = new Date();
const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

//obj["todoItems"][0]["name"]["doneOrNot"];
var add = (itemObj, itemObjArray, itemName) => {
    itemObj["name"] = itemName;
    itemObj["doneOrNot"] = "[ ]";
    itemObj["createAt"] = date;
    itemObjArray.push(itemObj);
}

var showTodoList = (itemObjArray) => {
    for (let i = 0; i < itemObjArray.length; i++) {
        let todoName = itemObjArray[i]["name"];
        let checkBox = itemObjArray[i]["doneOrNot"];
        let createAt = itemObjArray[i]["createAt"]
        let updatedAt = itemObjArray[i]["updatedAt"];
/*        if (updatedAt === null) {
            updatedAt === "NIL";
        }*/
        console.log(`${i+1}. ${checkBox} - ${todoName}   Created at: ${createAt}   Updated at: ${updatedAt}`);
    }
}

var done = (itemObjArray, numOfCheckBox) => {
    itemObjArray[numOfCheckBox-1]["doneOrNot"] = "[x]";

    // get updated date
    itemObjArray[numOfCheckBox-1]["updatedAt"] = date;

}

var deleteItem = (itemObjArray, numToDelete) => {
/*    //  to delete using name
    for (let i = 0; i < itemObjArray.length; i++) {
        if (itemObjArray[i]["name"] === itemName) {
            delete itemObjArray;
        }
    }*/

    // to delete using number
    delete itemObjArray[numToDelete-1];

}


const jsonfile = require("jsonfile");
const file = "data.json"


jsonfile.readFile(file, (err, obj) => {
    const itemObj = {}
    const itemObjArray = obj["todoItems"];

    // add items
    if (process.argv[2] === "add" && process.argv[3] !== undefined) {
        add(itemObj, itemObjArray, process.argv[3]);
       // showTodoList(itemObjArray);

    } else if (process.argv[2] === "show") {
        showTodoList(itemObjArray);

    } else if (process.argv[2] === "done" && process.argv[3] !== undefined) {
        //console.log(itemObj)
        var num = parseInt(process.argv[3]);
        done(itemObjArray, num);
        //showTodoList(itemObjArray);

    } else if (process.argv[2] === "delete" && process.argv[3] !== undefined) {
        var num = parseInt(process.argv[3]);
        deleteItem(itemObjArray, num);
        //showTodoList(itemObjArray);

    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err);
    });

  //console.log(obj)
});