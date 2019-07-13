const jsonfile = require( 'jsonfile' );
const file = './data.json';
const menuArr = [ 'Add Task', 'Show All Tasks', 'Mark As Done', 'Unmark An Task', 'Delete A Task' ];
const commandType = parseInt( process.argv[ 2 ] );
const parameter = process.argv[ 3 ];
let newTask = "";

let loadFrontPage = function() {
    let appTitle = `  ___  __    __    ____  __       ____   __     __    __  ____  ____
 / __)(  )  (  )  (_  _)/  \\  ___(    \\ /  \\   (  )  (  )/ ___)(_  _)
( (__ / (_/\\ )(     )( (  O )(___)) D ((  O )  / (_/\\ )( \\___ \\  )(
 \\___)\\____/(__)   (__) \\__/     (____/ \\__/   \\____/(__)(____/ (__) \n`;
    let menu = "";
    for ( let i = 0; i < menuArr.length; i++ ) {
        menu += `(${i+1}) ${menuArr[i]} \n`;
    }
    console.log( appTitle );
    console.log( menu );
    console.log( Date() );
}

let dateStamp = function() {
    let date = new Date();
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${dayOfMonth}-${month}-${year}, ${hour}:${minutes}:${seconds}`;
}

function AddTask( taskDescription, completedBoolean, dateCreated, dateCompleted ) {
    this.taskDescription = taskDescription;
    this.completedBoolean = completedBoolean;
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
}

let addNewTask = function() {
    jsonfile.readFile( file, ( err, obj ) => {
        if ( err ) {
            console.log( `ERROR DETECTED WHILE READING: ${err}` );
        } else {
            console.log( 'Pushing object into an array' );
            obj[ 'tasks' ].push( newTask );
        }
        jsonfile.writeFile( file, obj, ( err ) => {
            if ( err ) {
                console.log( `ERROR DETECTED WHILE WRITING: ${err}` );
            } else {
                console.log( `Write Operation Completed` );
            }

        } );
    } );
}

let showAllTasks = function() {
    jsonfile.readFile( file, ( err, obj ) => {
        for ( let i = 0; i < obj[ "tasks" ].length; i++ ) {
            let check = " ";
            if ( obj[ "tasks" ][ i ][ "completedBoolean" ] ) {
                check = "X";
            }
            console.log( `${i+1}. [${check}] - ${obj[ "tasks" ][ i ]["taskDescription"]}, Date Created: \x1b[36m${obj[ "tasks" ][ i ]["dateCreated"]}\x1b[0m, Date Completed: \x1b[31m${obj[ "tasks" ][ i ]["dateCompleted"]}\x1b[0m` );
        }
    } );
}

let markTaskDone = function( index ) {
    jsonfile.readFile( file, ( err, obj ) => {
        if ( index > 0 && index <= obj[ "tasks" ].length ) {
            obj[ "tasks" ][ index - 1 ][ "completedBoolean" ] = true;
            obj[ "tasks" ][ index - 1 ][ "dateCompleted" ] = dateStamp();
            jsonfile.writeFile( file, obj, ( err ) => {
                if ( err ) {
                    console.log( `ERROR DETECTED WHILE WRITING: ${err}` );
                } else {
                    console.log( `Mark As Done Completed` );
                }
            } );
        }
    } );
}

let unmarkTask = function( index ) {
    jsonfile.readFile( file, ( err, obj ) => {
        if ( index > 0 && index <= obj[ "tasks" ].length ) {
            obj[ "tasks" ][ index - 1 ][ "completedBoolean" ] = false;
            obj[ "tasks" ][ index - 1 ][ "dateCompleted" ] = "";
            jsonfile.writeFile( file, obj, ( err ) => {
                if ( err ) {
                    console.log( `ERROR DETECTED WHILE WRITING: ${err}` );
                } else {
                    console.log( `Unmark Task Completed` );
                }
            } );
        }
    } );
}

let deleteTask = function( index ) {
    jsonfile.readFile( file, ( err, obj ) => {
        if ( index > 0 && index <= obj[ "tasks" ].length ) {
            obj[ "tasks" ].splice( index - 1, 1 );
        }
        jsonfile.writeFile( file, obj, ( err ) => {
            if ( err ) {
                console.log( `ERROR DETECTED WHILE WRITING: ${err}` );
            } else {
                console.log( `Delete Operation Completed` );
            }
        } );
    } );
}

if ( commandType <= menuArr.length ) {
    console.log( "Echo master's command: " + menuArr[ commandType - 1 ] );
    if ( commandType === 1 && parameter ) {
        newTask = new AddTask( parameter, false, dateStamp(), "" );
        addNewTask();
    } else if ( commandType === 2 ) {
        showAllTasks();
    } else if ( commandType === 3 ) {
        markTaskDone( parameter )
    } else if ( commandType === 4 ) {
        unmarkTask( parameter )
    } else if ( commandType === 5 ) {
        if ( parameter > 0 ) {
            deleteTask( parameter );
        }
    }
} else {
    loadFrontPage();
}
