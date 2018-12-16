const jsonfile = require('jsonfile');

const file = 'data.json';

let date = new Date();
let todayDate = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();


var add = () => {
    jsonfile.readFile(file, (err, obj) => {
        //todoItem length
        //the 4th argument to be addItem
        // push add item

        let addItem = process.argv[3];
        obj.todoItem.push({
            num: (length + 1) + ".",
            checkbox: "[ ]",
            item: "- " + addItem,
            created: todayDate
        });
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
    });
}

var show = () => {
    jsonfile.readFile(file, (err, obj) => {
    let length = obj.todoItem.length;
    console.log()
       for (let i =0; i < length; i ++){
        //todoItemList num
        //todoItemList checkbox
        //todoItemList.item
        //Display the keys for todoItems keys
            let todoList = obj.todoItem;
            if (todoList[i].checkbox === "[x]") {
                console.log(todoList[i].num + todoList[i].checkbox + todoList[i].item + " (created at " +   todoList[i].created + ")" + " (updated at " + todoList[i].updated + ")");
            } else {
                console.log(todoList[i].num + todoList[i].checkbox + todoList[i].item + " (created at " +   todoList[i].created + ")");
            }
        }
                jsonfile.writeFile(file, obj, (err) => {
                    console.log(err);
                });
    });
}

var done = () => {
    jsonfile.readFile(file, (err, obj) => {
        let markDone = parseInt(process.argv[3]);
        markDone --;
        obj.todoItem[markDone].checkbox ="[x]";
        obj.todoItem[markDone].updated = todayDate;

            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
    });
}

var del = () => {
    jsonfile.readFile(file, (err, obj) => {
        let length = obj.todoItem.length;
        let option = obj.todoItem[parseInt(process.argv[3] - 1)];
        console.log("deleted => " + option.num + option.checkbox + option.item + option.created);
        obj.todoItem.splice(option, 1);

            if( option !== length) {
                for (let j = 0 ; j < (length-1) ; j++) {
                    obj.todoItem[j].num = (j + 1) + ".";
                }
            }

                jsonfile.writeFile(file, obj, (err) => {
                    console.log(err);
                });
    });
}


switch (process.argv[2]){
    case "add":
        add();
        break;
    case "show":
        show();
        break;
    case "done":
        done();
        break;
    case "delete":
        del();
        break;
}

