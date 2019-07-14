const jsonfile = require('jsonfile');
var commandType = process.argv[2];
var item = process.argv[3];
// console.log(commandType);
const file = 'data.json';

var storeData= function(item){
	//get the data
		jsonfile.readFile(file,(err, arr)=>{
			if (err){
				console.log("There's an error.");
				}
	//change the data			
			arr.push({todoItems:item,done:false,});//must have comma after "false" or or console log return undefined.

	//write to data.json

			jsonfile.writeFile(file,arr, (err)=>{
				if(err){console.log("Hmm");}
				});
			});
		}

// storeData(item);
var showData = function(){
	//get the data
	jsonfile.readFile(file,(err, arr)=>{
		if (err){
			console.log("There's an error.");
		} else if( arr.length > 0){
			//show the data
			//use some formating for nicer looking text

			arr.forEach(function(todoItems,index){
                console.log(index+1+"."," ["+(todoItems.done ? "X" : " ")+"] ",todoItems.todoItems);
			});
		}
	});
}

var done =function(){
	var item = process.argv[3];
	//get the data
	jsonfile.readFile(file,(err, arr)=>{
		if (err){
			console.log("There's an error.");
		}
		
	arr[item -1].done = !arr[item].done;//toggle the value : true and false

	jsonfile.writeFile(file,arr, (err)=>{
		if(err){console.log("Hmm");}
		});
	});	
};

var deleteItem =function(){
	var item = process.argv[3];
	//get the data
	jsonfile.readFile(file,(err, arr)=>{
		if (err){
			console.log("There's an error.");
		}
		
	arr.splice(item,1);
	

	jsonfile.writeFile(file,arr, (err)=>{
		if(err){console.log("Hmm");}
		});
	});	
};
switch(commandType){
	case "add":
			storeData(item);
			break;
	case "show":
			showData();
			break;
	case "done":
			done();
			break;
	case "delete":
			deleteItem();
			break;
}