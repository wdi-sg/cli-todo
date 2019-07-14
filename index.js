const jsonfile = require('jsonfile');

var commandType = process.argv[2];
var item = process.argv[3];
const file = 'data.json';

var storeData= function(item){
	
	//get the data
				jsonfile.readFile(file,(err, arr)=>{
				if (err){
				console.log("There's an error.");
				}
			
	//change the data			
				arr.push({todoItems:item,done:false,});

	//write to data.json

				jsonfile.writeFile(file,arr, (err)=>{
				if(err){console.log("Hmm");}
				});
			});
		};
					
					
var showData = function(){
	//get the data
				jsonfile.readFile(file,(err, arr)=>{
				if (err){
					console.log("There's an error.");
				} else if( arr.length > 0){

						console.log( " TO DO LIST"   );                                                 
			                                                                                                                                     
						console.log("");
						console.log("Created_at".padStart(50),"Updated_at".padStart(15));
						console.log("");
						arr.forEach(function(todoItems,index){
							let date = new Date();
							let created_at = date.getDate() +"/"+date.getMonth()+"/"+date.getFullYear()
							console.log(index+1+"."," ["+(todoItems.done ? "X" : " ")+"] ",todoItems.todoItems.padEnd(30), created_at, todoItems.done ? created_at.padStart(15) : " ");
						});
					}
	
				});
			};

var done =function(){
			var item = process.argv[3];
			//get the data
			jsonfile.readFile(file,(err, arr)=>{
				if (err){
				console.log("There's an error.");
				}
			
	//change the data			
			arr[item -1].done = !arr[item].done;//toggle the value : true and false

	//write to data.json

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
			
	//change the data			
				arr.splice(item-1,1);
	//write to data.json

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