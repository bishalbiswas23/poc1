/* 
  express is a node js web application framework that provides broad features for building web and mobile applications. IT helps us to handle requests and responses.
  fs is used to access physical file system. The fs module is responsible for all the asynchronous or synchronous file I/O operations.
  Path module provides a way of working with directories and file paths.
  Compression decreases the downloadable amount of data that's served to users & it improves the performance of the app as payload size is reduced drastically.
*/
const express = require('express'), app = express();
//https2 = require('spdy');
const compression = require('compression');
const fs = require('fs');
const path = require('path');

console.log(process.env)
app.use(compression()); // Using the compression on the app to reduce the payload size

// To serve static files such as images, CSS files, and JavaScript files, express.static built-in middleware function in Express is used
// Here, it executes the build folder (created using ng build command which creates a build directory with a production build of your app) which returns the app
app.use(express.static('./sales_dashboard'));


/*
    The process.env property is an inbuilt application programming interface of the process module which is used to get the user environment. 
    Here, if there is no BASE_PATH value set then it uses the default value set for the user environment
    writeFileSync overwrites the file contents and readFileSync reads the entire contents of the file.
*/
if (process.env.BASE_PATH) { // Replace the sub path(/heros-app/) with value given in the BASE_PATH whenever a BASE_PATH value is provided in route
    fs.writeFileSync('./sales_dashboard/index.html',
        fs.readFileSync('./sales_dashboard/index.html', 'utf8').replace('/sales_dashboard/', process.env.BASE_PATH),
        'utf8');
    app.use(process.env.BASE_PATH, express.static('./sales_dashboard'));
}

/* 
    app.get() function lets you define a route handler for GET requests to a given URL. 
    The app.get() function routes the HTTP GET Requests to the path which is being specified with the specified callback functions. 
    Basically it is intended for binding the middleware to your application.
    For example, the below code registers a route handler that Express will call when it receives an HTTP GET request to /* .
*/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './sales_dashboard/index.html')); // gives the app build file
})


/*
    var https2Server = https2.createServer({}, function (req, res) {
        res.writeHead(200, {'Content-Type':'text/javascript'});
        res.end('hello world!');
    })
    https2Server.listen(7000);
*/


/*
    The process.env property is an inbuilt application programming interface of the process module which is used to get the user environment. 
    Here, if there is no PORT value set then it uses the default value set for the user environment
*/
const PORT = process.env.PORT || 80;

// The app. listen() function is used to bind and listen the connections on the specified host and port. This method is identical to Node's http.
app.listen(PORT);
console.log('static server listening on ', PORT);

