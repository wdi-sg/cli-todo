console.log("Starting to like you json~");
// node index.js, process.argv[2]

const jsonfile = require('jsonfile');

const file = 'data.json';

//user input add
var input2 = process.argv[2];
console.log("input2: "+ input2);
// console.log("typeof input2: "+ typeof input2);

//user input toDo
var input3 = process.argv[3];
console.log("input3: "+ input3);
// console.log("typeof input3: "+ typeof input3);

var date = new Date();
// console.log("date: " + date);
// console.log("typeof date: " + typeof date);

// ==============================================

// when typed "create", create itemToDo array
if (input2 === "create"){
    console.log("create operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        }
        else {
            var obj = {
                "toDoItems" : []
            }

            jsonfile.writeFile(file, obj, (err) =>{
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(input2 + " completed")
                }
            })
        }
    })

}
// ==============================================

// when typed "add", push item to the array
else if (input2 === "add") {
    console.log("add operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {

            // create number, status and string keys
            obj.toDoItems.push({
                "itemNumber" : (obj.toDoItems.length + 1).toString(),
                "itemStatus" : "[ ]",
                "itemString" : input3,
                "action" : "created",
                "actionDate" : date
            })

            jsonfile.writeFile(file,obj, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("add " + input3 + " completed");
                }
            })

        }
    })
}

// ==============================================

// when typed "show", show all items added previously
else if (input2 === "show") {
    console.log("show operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < obj.toDoItems.length; i++) {
                console.log(obj.toDoItems[i].itemNumber + ". " + obj.toDoItems[i].itemStatus + " - " + obj.toDoItems[i].itemString + " , " + obj.toDoItems[i].action + " at " +obj.toDoItems[i].actionDate);
            }
        }
    })
}

// ==============================================

// when type done and "#", change the status from [ ] to [x]
else if (input2 === "done") {
    console.log("done operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < obj.toDoItems.length; i++) {
                if (obj.toDoItems[i].itemNumber === input3) {
                    obj.toDoItems[i].itemStatus = "[x]";
                    obj.toDoItems[i].action = "updated";
                    obj.toDoItems[i].actionDate = date;

                    jsonfile.writeFile(file, obj, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("done " + input3 + " completed")
                        }
                    })
                }
            }

        }
    })

}

// ==============================================

// when type delete and "#", change the status and string to null
else if (input2 === "delete") {
    console.log("delete operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < obj.toDoItems.length; i++){
                if (obj.toDoItems[i].itemNumber === input3) {
                    obj.toDoItems[i].itemStatus = null;
                    obj.toDoItems[i].itemString = null;
                    obj.toDoItems[i].action = "deleted";
                    obj.toDoItems[i].actionDate = date;

                    jsonfile.writeFile(file, obj, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("delete " + input3 + " completed")
                        }
                    })
                }
            }
        }
    })
}

// ==============================================
else if (input2 === "insert") {
    console.log("insert operation");
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (i = 0; i < obj.toDoItems.length; i++ ) {
                if (obj.toDoItems[i].itemStatus !== null){
                    console.log("no deleted item, use add instead");
                }
                else if (obj.toDoItems[i].itemStatus === null) {
                    obj.toDoItems[i].itemStatus = "[ ]";
                    obj.toDoItems[i].itemString = input3;
                    obj.toDoItems[i].action = "inserted";
                    obj.toDoItems[i].actionDate = date;

                    jsonfile.writeFile(file, obj, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("insert " + input3 + " completed")
                        }
                    })
                }

            }
        }
    })
}

;

// ==============================================
//testing read logic
if (input2 === "read") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("obj: " + obj);
            console.log("obj.toDoItems: " + obj.toDoItems);
            console.log("obj.toDoItems[0]: " + obj.toDoItems[0]);

            console.log("obj.toDoItems[0].itemsNumber: " + obj.toDoItems[0].itemNumber);
            console.log("typeof: " + typeof obj.toDoItems[0].itemNumber);

            console.log("obj.toDoItems[0].status: " + obj.toDoItems[0].status);
            console.log("obj.toDoItems[0].taskString: " + obj.toDoItems[0].taskString);
        }
    })
};

// testing write logic
if (input2 === "write") {
    jsonfile.readFile(file,(err,obj) => {
        if (err) {
            console.log(err);
        }
        else {

            var obj = {
                toDoItems : [{
                                "itemNumber": "1",
                                "itemStatus": "[ ]",
                                "itemString": "eat bak kut teh"
                                }
                ]
            };

            jsonfile.writeFile(file, obj, (err)=> {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("writeFile completed")
                }
            })
        }
    })

};