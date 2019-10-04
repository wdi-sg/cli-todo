#!/usr/bin/env node


const pckg = require("./../package.json");
const program = require("commander");


const add = require("./../lib/add");
const show = require("./../lib/show");
const edit = require("./../lib/edit");
const remove = require("./../lib/remove");


program.version(pckg.version); // todo --version => display version

program
  .command("add <todo>")
  .alias("a")
  .description("Add a new todo.")
  .action((todo) => {
    add(todo);
  });

program
  .command("show")
  .alias("s")
  .description("Lists all todos.")
  .action(() => {
    show();
  });

program
  .command("edit <id> <status>")
  .alias("e")
  .description("Change todo to completed.")
  .action((id, status) => {
    edit(id, status);
  });

program
  .command("remove <id>")
  .alias("r")
  .description("Remove todo from list.")
  .action((id) => {
    remove(id);
  });

program.parse(process.argv); // get arv
