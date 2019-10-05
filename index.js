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


	switch(allDataProcess[0]) {
	  case 'show':
		showData(obj);
	    break;
	  case 'add':
	  	addData(obj);
	    break;
	  case 'delete':
		deleteData(obj);
	    break;
	}

// write it out
	// console.log(obj);
	//   obj["helloworld"] = "monkey";

	  jsonfile.writeFile(file, obj, (err) => {
	    if (err !== null) {
	    	console.log(err);}
	  });

});


const showData = function(obj) { 
	for (var i = 0; i < obj.item.length; i++) {
			let displayNumber = i+1;
					console.log(displayNumber +'. [' +obj.item[i][1]+'] - ' + obj.item[i][0] + ' updated: ' + obj.item[i][2]);

			}	
}

const addData = function(obj) { 
	
console.log('addData call')
}

const deleteData = function(obj) { 
console.log('delete call')	
	
}