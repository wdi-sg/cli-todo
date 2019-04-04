console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

    // jsonfile.readFile(file, (err, obj) => {

    //   console.log(obj);
    //   obj["helloworld"] = "monkey";

    //   jsonfile.writeFile(file, obj, (err) => {
    //     console.log(err)
    //   });
    // });

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (obj) => {
//   console.log(obj);
// })

// jsonfile.add(file,(obj)) => {
//     let obj = process.argv[3];
//     console.log(obj);
//     jsonfile.writeFile(file,obj,err){
//         console.log(err);
//     }
// }