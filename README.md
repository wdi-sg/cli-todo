# cli-todo

![https://i.giphy.com/media/26ufnwz3wDUli7GU0/giphy.webp](https://i.giphy.com/media/26ufnwz3wDUli7GU0/giphy.webp)

Create a commandline todo list app that you can use from your terminal and that will keep track of things you need to do.

## How to run my app
1. Install dependencies
  > npm install
2. JSON file will be created automatically into home directory if it does not exist.
3. Run app (adding a "node" before command is not required)
  * Add new todo
    > todo add "new todo 1"
  * List all todos
    > todo show
  * Set todo as completed
    > todo edit <id> done
  * Set todo as uncompleted
    > todo edit <id> undone
  * Remove todo
    > todo remove <id>

## Task Assigned
### Deliverables:

#### Add to the list

```
node todo.js add "eat bak kut teh"
```

```
1. [ ] - eat bak kut teh
```

#### See the list

```
node todo.js show
```

```
1. [ ] - eat bak kut teh
2. [ ] - go shopping
3. [ ] - feed dog
4. [ ] - swim practice
5. [ ] - code app
6. [ ] - meet gabriel
```



#### Getting Started:
Create and install some things:
```
npm init
npm install jsonfile
touch data.json
```

Put the following code inside `data.json`:
```
{}
```

Now you can start coding the `index.js` file. The one provided has a basic jsonfile example in it. (you should get rid of this basic example as you code your app)

Implement the deliverables in the order shown above.

1. Add to the list. (It starts empty)

1. Show all the items in the list (Once you have something inside it)

*Hint*: you MUST add a data structure into the json file: the *array* of todo items you want to track.

So it should look like this:

data.json:
```
{
  "todoItems" : []
}
```

*Hint*:
Which `jsonfile` library functions will you use for each of the above deliverables?

*Hint*:
What will the JSON look like inside the `data.json` file when your app is done running an `add`?

#### Further:

#### Mark as done

```
node todo.js done 4
```

```
1. [ ] - go shopping
2. [ ] - feed dog
3. [ ] - swim practice
4. [x] - code app
5. [ ] - meet gabriel
6. [ ] - eat bak kut teh
```

#### Further:
Add a column named `created_at` with data type date and display the date the item was added. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

#### Further:
Add the ability to permanently delete an item.

#### Further:
Add a column named `updated_at` with data type date and display the date the item was marked completed.

#### Further:
Use an ascii art generator to add style to your app: [http://patorjk.com/software/taag](http://patorjk.com/software/taag) - here you could use the ES6 string interpolation syntax.

#### Further:
There are frameworks to make a completely dynamic command line app. Use a framework to make the app interactive: [https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2](https://medium.freecodecamp.org/writing-command-line-applications-in-nodejs-2cf8327eee2)
