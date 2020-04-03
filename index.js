// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

const userArgs = process.argv.slice(2);

const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if(dd<10) {
    dd = '0' + dd;
    }

    if(mm<10) {
    mm = '0' + mm;
    }

    today = mm+'-'+dd+'-'+yyyy;
    today = mm+'/'+dd+'/'+yyyy;
    today = dd+'-'+mm+'-'+yyyy;
    today = dd+'/'+mm+'/'+yyyy;

    return today;
}

jsonfile.readFile(file, (err, obj) => {

    let toDoItem = {
        created_at: getCurrentDate(),
        done: "[ ]",
        updated_at: "",
        item: ""
    }

    //to refactor to switch statement

    if (userArgs[0] === 'add') {
        toDoItem.item = userArgs[1];
        obj["toDoItems"].push(toDoItem);

    } else if (userArgs[0] === 'clearall') {
        obj.toDoItems.length = 0;

    } else if (userArgs[0] === 'crossoff') {
        obj.toDoItems.forEach(el => {
            if (userArgs[1] === el.item) {
                el.done = "[X]";
                el.updated_at = getCurrentDate();
            }
        })

    } else if (userArgs[0] === 'clear') {
        obj.toDoItems.forEach(el => {
            if (userArgs[1] === el.item) {
                obj.toDoItems.splice(obj.toDoItems.indexOf(el), 1);
            }
        })

    } else if (userArgs[0] === 'show') {

        console.log(`
            ╔═╗┌─┐┌─┐┬ ┬┌─┐  ╔╦╗┌─┐  ╔╦╗┌─┐  ╦  ┬┌─┐┌┬┐
            ╔═╝├─┤│  ├─┤└─┐   ║ │ │───║║│ │  ║  │└─┐ │
            ╚═╝┴ ┴└─┘┴ ┴└─┘   ╩ └─┘  ═╩╝└─┘  ╩═╝┴└─┘ ┴
        `);

        obj.toDoItems.forEach(el => {
            console.log(`${obj.toDoItems.indexOf(el) + 1}. ${el.done} - ${el.item}`)
        })

    } else if (userArgs[0] === 'showmeta') {

        console.log(`
            ╔═╗┌─┐┌─┐┬ ┬┌─┐  ╔╦╗┌─┐  ╔╦╗┌─┐  ╦  ┬┌─┐┌┬┐
            ╔═╝├─┤│  ├─┤└─┐   ║ │ │───║║│ │  ║  │└─┐ │
            ╚═╝┴ ┴└─┘┴ ┴└─┘   ╩ └─┘  ═╩╝└─┘  ╩═╝┴└─┘ ┴
        `);

        obj.toDoItems.forEach(el => {

            console.log(`${obj.toDoItems.indexOf(el)}. ${el.done} - ${el.item}`)

            console.log(`Item added to list on ${el["created_at"]}`);

            if (el.done === "[X]") {
                console.log(`Marked done on ${el["updated_at"]}`);
            }

            console.log ('\n');
        })
    }

    jsonfile.writeFile(file, obj, (err) => {
        if (err) console.log(err);
    });

});

// to add some argument validation