const jsonfile = require('jsonfile');

const file = 'data.json';

var add = () => {
    jsonfile.readFile(file, (err, obj) => {
        let length = obj.todoItem.length;
        let addItem = process.argv[3];
        // push add item
        obj.todoItem.push({
            num: (length + 1) + ".",
            checkbox: "[ ]",
            item: "- " + addItem
        });
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
    });
}

var show = () => {
    jsonfile.readFile(file, (err, obj) => {
    let length = obj.todoItem.length;
       for (let i =0; i < length; i ++){
        let listNum = obj.todoItem[i].num;
        let checkbox = obj.todoItem[i].checkbox;
        let item = obj.todoItem[i].item;
        console.log(listNum + checkbox + item);
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
}

