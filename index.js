const jsonfile = require('jsonfile');

// var commandType = process.argv[2];
// var item = process.argv[3];
const file = 'data.json';

const addItem = function(item){
	
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
					
					
const showList = function(){
	//get the data
				jsonfile.readFile(file,(err, arr)=>{
				if (err){
					console.log("There's an error.");
				} else if( arr.length > 0){

						console.log( " TO DO LIST".padStart(30)   );                                                 
			                                                                                                                                     
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

const checkItem =function(index){
			// var item = process.argv[3];
			//get the data
			jsonfile.readFile(file,(err, arr)=>{
				if (err){
				console.log("There's an error.");
				}
			
	//change the data

			arr[index -1].done = !arr[index -1].done;//toggle the value : true and false

	//write to data.json

				jsonfile.writeFile(file,arr, (err)=>{
				if(err){console.log("Hmm");}
				});
			});
		};
					
				
		

const deleteItem =function(index){
				// var item = process.argv[3];
	//get the data
				jsonfile.readFile(file,(err, arr)=>{
				if (err){
				console.log("There's an error.");
				}
			
	//change the data			
				arr.splice(index-1,1);
	//write to data.json

				jsonfile.writeFile(file,arr, (err)=>{
				if(err){console.log("Hmm");}
				});
			});
		};
					
	module.exports = {
		addItem,
		showList,
		checkItem,
		deleteItem
	}				

// switch(commandType){
// 	case "add":
// 			addItem(item);
// 			break;
// 	case "show":
// 			showList();
// 			break;
// 	case "done":
// 			checkItem();
// 			break;
// 	case "delete":
// 			deleteItem();
// 			break;
// }