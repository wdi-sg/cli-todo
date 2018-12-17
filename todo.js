const jsonfile = require('jsonfile');
const file = 'data.json';

let commandType = process.argv[2];
let userInput = process.argv[3];

let date = Date();

const add = (userInput) => { jsonfile.readFile(file, (err, obj) => {
    if (err) { console.log(err) };
    
    if ( process.argv.length > 4) {
        console.log("Invalid")
    } else {
        obj[(Object.keys(obj).length) + 1] = [process.argv[3], "undone",date, " "];

        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
        });
    }
    
})};

const show = (userInput) => { jsonfile.readFile(file, (err, obj) => {
    if (err) { console.log(err) };

    if ( process.argv.length > 3) {
        console.log("Invalid")
    } else {
        info();
        for (let i = 0; i < Object.keys(obj).length; ++i) {
            if ((Object.values(obj)[i][1]) === "undone") {
                console.log(`${(Object.keys(obj)[i])}. [ ] - ${(Object.values(obj)[i][0])}`);
                console.log(`Made at: ${(Object.values(obj)[i][2])}\nDone at:${(Object.values(obj)[i][3])}`);
            } else if ((Object.values(obj)[i][1]) === "done")
            console.log(`${(Object.keys(obj)[i])}. [X] - ${(Object.values(obj)[i][0])}`);
        }
    }
})};

const mark = (userInput) => { jsonfile.readFile(file, (err, obj) => {
    if (err) { console.log(err) };

    if ( process.argv.length > 4) {
        console.log("Invalid")
    } else {
        let index = parseInt(process.argv[3]) - 1;
        console.log(index)
        Object.values(obj)[index][1] = "done";
        Object.values(obj)[index][3] = date;
        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
            console.log(Object.values(obj)[index][1])
        });
    }
})};

const remove = (userInput) => { jsonfile.readFile(file, (err, obj) => {
    if (err) { console.log(err) };

    if ( process.argv.length > 4) {
        console.log("Invalid")
    } else {
        let index = parseInt(process.argv[3]);
        console.log("index = "+ index)
        delete obj[index];

        for (let i = 0; i < Object.keys(obj).length; ++i) {
        let value = obj[Object.keys(obj)[i]];
        delete obj[Object.keys(obj)[i]];
        obj[`${i+1}`] = value;
        console.log(obj[i+1]);
        }

        jsonfile.writeFile(file, obj, (err) => { if (err) { console.log(err) }; });
    }
})};

switch(commandType.toLowerCase()) {
    case "add" : add();
    break;
    case "show" : show();
    break;
    case "done" : mark();
    break;
    case "delete" : remove();
    break;
}

const info = () => {
    console.log(`  =======================================================================`)
    console.log(`       ██╗██╗   ██╗███████╗████████╗    ██████╗  ██████╗     ██╗████████╗`)
    console.log(`       ██║██║   ██║██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗    ██║╚══██╔══╝`)
    console.log(`       ██║██║   ██║███████╗   ██║       ██║  ██║██║   ██║    ██║   ██║   `)
    console.log(`  ██   ██║██║   ██║╚════██║   ██║       ██║  ██║██║   ██║    ██║   ██║   `)
    console.log(`  ╚█████╔╝╚██████╔╝███████║   ██║       ██████╔╝╚██████╔╝    ██║   ██║   `)
    console.log(`   ╚════╝  ╚═════╝ ╚══════╝   ╚═╝       ╚═════╝  ╚═════╝     ╚═╝   ╚═╝   `)
    console.log(`  =======================================================================`)
    console.log(`   Use the following commands:`)
    console.log(`   1: node todo.js add " "`)
    console.log(`   2: node todo.js show`)
    console.log(`   3: node todo.js done #`)
    console.log(`   4: node todo.js delete #`)
    console.log(`  =======================================================================`)
}
