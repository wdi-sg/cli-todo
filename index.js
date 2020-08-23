const jsonfile = require('jsonfile')
const file = 'data.json'
const { program } = require('commander');
program.version('0.0.1');

program
.option('-a, --add-item <item>', 'append to list')
.option('-d, --done-itemNumber <item-number>', 'mark as completed')
.option('-s, --show', 'show whole list')
.option('-rm, --remove-itemNumber <item-number>', 'remove from list')
.option('--debug', 'show all options')

program.parse(process.argv);

class ListItem {
    constructor(str) {
        this.item = str;
        this.done = false;
        this.date = new Date();
        this.update = null;
    }
}

let add =(item)=> {
    jsonfile.readFile(file, (err, obj) => {
        if(err) {
            console.error(err)
            process.exitCode = 1;
        }
        let newItem = new ListItem(item);
        obj.list.push(newItem)

        jsonfile.writeFile(file, obj, (err) => {
            if(err) {
                console.error(err)
                process.exitCode = 1;
            }

        });
    });
}

let show =()=> {
    jsonfile.readFile(file, (err, obj) => {
        if(err) {
            console.error(err)
            process.exitCode = 1;
        }
        console.log
(`
 ____ ____ ____ _________ ____ ____ ____ ____
||H |||I |||T |||       |||L |||I |||S |||T ||
||__|||__|||__|||_______|||__|||__|||__|||__||
|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|/__\\|

`);
        obj.list.forEach((item, index)=>{
            let done = item.done ? 'x' : ' ';
            let updated = item.update ? `updated: ${item.update}` : '';
            console.log(`${index + 1}. [${done}] - ${item.item} Added: ${item.date} ${updated}`);
        })
    });
}

let remove =(num)=> {
    num = num - 1;
    jsonfile.readFile(file, (err, obj) => {
        if(err) {
            console.error(err)
            process.exitCode = 1;
        }
        obj.list = obj.list.filter((item,index)=>{
            return index !== num
        })

        jsonfile.writeFile(file, obj, (err) => {
            if(err) {
                console.error(err)
                process.exitCode = 1;
            }

        });
    });
}

let done =(num)=> {
    num = num - 1;
    jsonfile.readFile(file, (err, obj) => {
        if(err) {
            console.error(err)
            process.exitCode = 1;
        }

        obj.list[num].done = true;
        obj.list[num].update = new Date();

        jsonfile.writeFile(file, obj, (err) => {
            if(err) {
                console.error(err)
                process.exitCode = 1;
            }

        });
    });
}


if(program.debug) console.log(program.opts());
if(program.addItem) add(program.addItem);
if(program.doneItemNumber) done(program.doneItemNumber);
if(program.show) show();
if(program.removeItemNumber) remove(program.removeItemNumber)


// input function add string
// input function done index + 1
// input function delete remove entry
// style it
// show list of item with timestamp created and timestamp update