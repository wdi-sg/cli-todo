var jsonfile = require('jsonfile');
var program = require('commander');

const file = 'data.json';

var listItems = function (obj){

	console.log(`

.########..#######.....########...#######.....##.......####..######..########
....##....##.....##....##.....##.##.....##....##........##..##....##....##...
....##....##.....##....##.....##.##.....##....##........##..##..........##...
....##....##.....##....##.....##.##.....##....##........##...######.....##...
....##....##.....##....##.....##.##.....##....##........##........##....##...
....##....##.....##....##.....##.##.....##....##........##..##....##....##...
....##.....#######.....########...#######.....########.####..######.....##...
   
`);

	console.log('The following is your to-do list:');
	console.log("Format: Index. ['done'] - List | Created Date | Updated Date ");
	console.log('----------------------------------');


	for (let i=0; i<obj['toDoItems'].length;i++){
	  	console.log(`${i+1}. [${obj['toDoItems'][i]['done']}] - ${obj['toDoItems'][i]['name']} | ${obj['toDoItems'][i]['dateCreated']} | ${obj['toDoItems'][i]['dateUpdated']}`);
	}

	console.log(`\n`);

};

//list all items
program
	.command('list')
	.alias('l')
	.description('List all items in To-Do List.')

	.action(function (){
		jsonfile.readFile(file, (err, obj) => {
	  	listItems(obj);
	});
});

//add item to list
program
	.command('add <list>')
	.alias('a')
	.description('Add item to To-Do List.')

	.action(function (list){
		jsonfile.readFile(file, (err, obj) => {

		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

		let listObj = {
			'name': list,
			'done': ' ',
			'dateCreated': date,
			'dateUpdated': ' '
		}

	  	obj["toDoItems"].push(listObj);

	  	listItems(obj);

	  	jsonfile.writeFile(file, obj, (err) => {
	  	})
	});
});

//Mark Done
program
	.command('mark <index>')
	.alias('m')
	.description('Mark Item Done on List.')

	.action(function (index){
		jsonfile.readFile(file, (err, obj) => {

		index = parseInt(index);
		let today = new Date();
		let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	  	obj['toDoItems'][index-1]['done'] = 'x';
	  	obj['toDoItems'][index-1]['dateUpdated'] = date;

	  	listItems(obj);

	  	jsonfile.writeFile(file, obj, (err) => {
	  	})
	});

});

//Remove Item
program
	.command('remove <index>')
	.alias('r')
	.description('Remove Item from list.')

	.action(function (index){
		jsonfile.readFile(file, (err, obj) => {

		index = parseInt(index);

	  	obj['toDoItems'].splice(index-1,1);

	  	listItems(obj);

	  	jsonfile.writeFile(file, obj, (err) => {
	  	})
	});

});

program.parse(process.argv);
