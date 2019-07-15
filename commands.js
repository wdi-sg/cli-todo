const jsonfile = require('jsonfile');

const file = 'data.json';

const add = (status, task) => {
    console.log(`adding task ${task}, status ${status}.`)

    jsonfile.readFile(file, (err, obj) => {

        console.log(obj);
        obj[`${status}`] = `${task}`;
        // index += 1;

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
            file = obj;
        });
    });

}

module.exports = {
    add
}