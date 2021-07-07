const reqAction = process.argv[2];
const reqItem = process.argv[3];
const jsonfile = require('jsonfile');
const file = 'data.json';
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var updated_at = null;


if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}




var addItem = (item, status) => {
    jsonfile.readFile(file, (err, obj) => {
        let created_at = dd + "-" + mm + "-" + yyyy;
        obj.todoItems.push(["[" + status +"]", item, "created at " + created_at, null]);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
}


var showList = () => {
    jsonfile.readFile(file, (err, obj) => {
console.log("▄▄▄█████▓ ▒█████     ▓█████▄  ▒█████      ██▓     ██▓  ██████ ▄▄▄█████▓")
console.log("▓  ██▒ ▓▒▒██▒  ██▒   ▒██▀ ██▌▒██▒  ██▒   ▓██▒    ▓██▒▒██    ▒ ▓  ██▒ ▓▒")
console.log("▒ ▓██░ ▒░▒██░  ██▒   ░██   █▌▒██░  ██▒   ▒██░    ▒██▒░ ▓██▄   ▒ ▓██░ ▒░")
console.log("░ ▓██▓ ░ ▒██   ██░   ░▓█▄   ▌▒██   ██░   ▒██░    ░██░  ▒   ██▒░ ▓██▓ ░ ")
console.log("  ▒██▒ ░ ░ ████▓▒░   ░▒████▓ ░ ████▓▒░   ░██████▒░██░▒██████▒▒  ▒██▒ ░ ")
console.log("  ▒ ░░   ░ ▒░▒░▒░     ▒▒▓  ▒ ░ ▒░▒░▒░    ░ ▒░▓  ░░▓  ▒ ▒▓▒ ▒ ░  ▒ ░░   ")
console.log("    ░      ░ ▒ ▒░     ░ ▒  ▒   ░ ▒ ▒░    ░ ░ ▒  ░ ▒ ░░ ░▒  ░ ░    ░    ")
console.log("  ░      ░ ░ ░ ▒      ░ ░  ░ ░ ░ ░ ▒       ░ ░    ▒ ░░  ░  ░    ░      ")
console.log("             ░ ░        ░        ░ ░         ░  ░ ░        ░           ")
console.log("                      ░                                                ")
    for (i = 0; i < obj.todoItems.length; i ++) {
    console.log(i+1 + ". " + obj.todoItems[i].join("  "))
    ;
    }
    });
}

var doneItem = (index)  => {
    jsonfile.readFile(file, (err, obj) => {
        let updated_at = dd + "-" + mm + "-" + yyyy;
        for (i = 0; i < obj.todoItems.length; i ++) {
            if (i === index-1) {
                obj.todoItems[i][0] = "[x]"
                obj.todoItems[i][3] = "updated at " + updated_at;
                console.log(obj.todoItems[i])
            }
            jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
            });
        }
    });
}


var deleteItem = (index)  => {
    jsonfile.readFile(file, (err, obj) => {
        for (i = 0; i < obj.todoItems.length; i ++) {
            if (i === index-1) {
                obj.todoItems.splice(i,1);
            jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
            });
            }
        }
    });
}


switch (reqAction) {
    case "add":
    addItem(reqItem," ");
    break;
    case "show":
    showList();
    break;
    case "done":
    doneItem(reqItem);
    break;
    case "delete":
    deleteItem(reqItem);
    break;
}


