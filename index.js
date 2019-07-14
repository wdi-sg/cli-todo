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
                "itemString" : input3
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
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < obj.toDoItems.length; i++) {
                console.log(obj.toDoItems[i].itemNumber + ". " + obj.toDoItems[i].itemStatus + " - " + obj.toDoItems[i].itemString);
            }
        }
    })
}

// ==============================================

// when type done and "#", change the status from [ ] to [x]
else if (input2 === "done") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < obj.toDoItems.length; i++) {
                if (obj.toDoItems[i].itemNumber === input3) {
                    obj.toDoItems[i].itemStatus = "[x]";

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



;

// ==============================================





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