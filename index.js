// console.log("works!!", process.argv[2]);

const allDataProcess = [];


// grab all the data from the console
for (var i = 2; i < process.argv.length; i++) {
console.log(process.argv[i]);
allDataProcess.push(process.argv[i]);
}

// get the current date/time
const currentdate = new Date(); 
let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

// console.log(allDataProcess);

// console.log(datetime);

let commandType = allDataProcess[0];

// console.log("Your command was: "+commandType);


const jsonfile = require('jsonfile');

const file = 'data.json'





jsonfile.readFile(file, (err, obj) => {


	if (allDataProcess[0]==='show') {
	for (var i = 0; i < obj.item.length; i++) {
				console.log(obj.item[i]);
		}	
	}
	else {
	console.log(obj);
	//   obj["helloworld"] = "monkey";

	  jsonfile.writeFile(file, obj, (err) => {
	    console.log(err)
	  });
	}

});
