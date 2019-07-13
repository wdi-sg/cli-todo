console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    if (err) {
        console.log('there is an error!');
    } else {
        obj["helloworld2"] = "monkey2";

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log('there is an error!')
            } else {
                console.log(obj);
            }
        });
    };
});