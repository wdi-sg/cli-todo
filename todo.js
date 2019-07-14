const program = require('commander');
program.version('0.0.1');

const {
	addItem,
	showList,
	checkItem,
	deleteItem
} = require("./index.js");

program
	.description("To do List")
program
	.command("add <item>")
	.action((item) => {
		addItem(item);
	});

program
	.command("show")
	.action(() => {
		showList();
	});

program
	.command("done <index>")
	.action((index) => {
		checkItem(index);
	});

program
	.command("delete <index>")
	
	.action((index) => {
		deleteItem(index);
	});
program.parse(process.argv);			
