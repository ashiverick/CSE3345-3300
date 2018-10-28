'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql      = require('mysql');
var connection = mysql.createConnection({

    //host will be the name of the service from the docker-compose file.
    host     : 'mysql',
    user     : 'root',
    password : 'go_away!',
    database : 'Chatboard'
});
connection.connect();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world!');
    }
});

//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getData',
    handler: function (request, reply) {
        console.log('Server processing a /getData request');

        //Creates the connection

        //Does a simple select, not from a table, but essentially just uses MySQL
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply ('The solution is ' + results[0].solution);

            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            var solution = results[0].solution;
            console.log('The solution is: ', solution);
        });
        //close the connection to MySQL
    }
});

//get first name and last name
server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
        //console.log('Or outside the function?');
        var temp = [];
        connection.query('SELECT firstName, lastName FROM Users', function (error, results, fields){
            if (error) {
              throw error;
            }
            temp = results;
            //reply('Hello, ' + results[0].firstName + ' ' + results[0].lastName);
            reply(temp);
            //console.log('Do I show up inside?');
        });
        //console.log('Do I show up outside?');
      //close connection
    }

});

//USERS TABLE QUERYS

//get Username
server.route({
    method: 'GET',
    path: '/username',
    handler: function (request, reply) {
        connection.query('SELECT userName FROM Users', function (error, results, fields){
            if (error) {
              throw error;
            }
              reply('Username: ' + results[0].userName);
        });
    }
});
//LOG IN or CREATE ACCOUNT
// server.route({
//     method: 'POST',
//     path: '/user',
//     handler: function (request, reply) {
//         var username = request.payload.['username'];
//         var firstname = request.payload.['firstName'];
//         var lastname = request.payload.['lastname'];
//         connection.query('', function (error, results, fields){}
//             if (error) {
//               throw error;
//             }
//         });
//     }
//
// });


//get zipcode
server.route({
    method: 'GET',
    path: '/getzipcode',
    handler: function (request, reply) {
        var json = "{\"zipcode\": \"74030\"}";
        var zips = [];

        connection.query('SELECT zipCode FROM Users', function (error, results, fields){
            if (error) {
              throw error;
            }
            zips = results;
            console.log(zips);
            reply(zips);
        });
    }
});

server.route({
    method: 'GET',
    path: '/listofcand',
    handler: function (request, reply) {
        var json = '{\"list\": \"candidates\"}';
        var cands = [];
        connection.query('SELECT candidateOffice FROM Users', function (error, results, fields){
            if (error) {
              throw error;
            }
            cands = results;
            console.log(results);
            reply(cands);
        });
    }
});

server.route({
    method: 'GET',
    path: '/listofpolit',
    handler: function (request, reply) {
        var json = '{\"list\": \"politicians\"}';
        var polits = [];
        connection.query('SELECT politicanOffice FROM Users', function (error, results, fields){
            if (error) {
              throw error;
            }
            polits = results;
            console.log(results);
            reply(polits);
        });
    }
});

//requests for the issues TABLE

// //ADDING ISSUES TO LIST (CHECKING BOOLS)
server.route({
    method: 'POST',
    path: '/issues/addissues',
    handler: function (request, reply) {
        var userName = request.payload.userName;
        var econJobs = request.payload.econJobs;
        var immigration = request.payload.immigration;
        var healthCare = request.payload.healthCare;
        var globalWarming = request.payload.globalWarming;
        var budget = request.payload.budget;
        var abortion = request.payload.abortion;
        var sql = "INSERT INTO Issues (userName, econJobs, immigration, healthCare, globalWarming, budget, abortion) VALUES (" + "'" + userName + "'" +", "+ "'" + econJobs + "'" + ", " + "'" + immigration + "'" +", "+ "'" + healthCare + "'" + ", " +"'" + globalWarming + "'" + ", "+ "'" + budget + "'" + "," + "'" + abortion + "'" + ")";
        connection.query(sql, function (error, results, fields){
            if (error)
                throw error;
            reply('issues added');
        });
    }
});

//GETTING ISSUES FROM list
server.route({
    method: 'GET',
    path: '/issues/getissues',
    handler: function (request, reply) {
        var json = '{\"list\": \"issues\"}';
        var issues = [];
        connection.query('SELECT econJobs, immigration, healthCare, globalWarming, budget, abortion FROM Issues', function (error, results, fields){
            if (error) {
              throw error;
            }
            issues = results;
            console.log(results);
            reply(issues);  
        });
    }
});

//POSTS TABLE QUERIES

//Returns all fields from the posts table
server.route({
    method: 'GET',
    path: '/post/getpost',
    handler: function (request, reply) {
        connection.query('SELECT * FROM Posts', function (error, results, fields){
            if (error) {
                throw error;
            }
            reply(results);
        });
    }
});

//Add a post to the post table (effectively the chatboard)
//Posts contain a username, the post body, tags, id, and the number of likes
server.route({
    method: 'POST',
    path: '/post/addpost', 
    handler: function (request, reply) {
        var userName = request.payload.userName;
        var body = request.payload.body;
        var tag1 = request.payload.tag1;
        var tag2 = request.payload.tag2;
        var tag3 = request.payload.tag3;
        var tag4 = request.payload.tag4;
        var id = request.payload.id;    
        var likes = request.payload.likes;
        var sql = "INSERT INTO Posts (userName, body, tag1, tag2, tag3, tag4, id, likes) VALUES (" + "'" + userName + "'" + ", " + "'" + body + "'" + ", " + "'" + tag1 + "'" +", "+ "'" + tag2 + "'" + ", " +"'" + tag3 + "'" + ", "+ "'" + tag4 + "'" + ", " + "'" + id + "'" + ", "+"'" + likes + "'" +")";
        console.log(sql);
        connection.query(sql, function (error, results, fields){
            if (error)
                throw error;
            reply("Post added to table");
        });
    }
});

server.route({
    method: 'GET',
    path: '/post/getid',
    handler: function (request, reply) {
        connection.query("SELECT id FROM Posts", function (error, results, fields){
            if (error)
                throw error;
            reply(results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/post/getusername',
    handler: function (request, reply) {
        connection.query("SELECT userName FROM Posts", function (error, results, fields){
            if (error)
                throw error;
            reply(results);
        });
    }
});

server.route({
    method: 'GET',
    path: '/post/getbody',
    handler: function (request, reply) {
        connection.query("SELECT body FROM Posts", function (error, results, fields){
            if (error)
                throw error;
            reply(results);
        });
    }
});

//return the likes from a post via a post Id
server.route({
    method: 'GET',
    path: '/post/getlikes/{id}',
    handler: function (request, reply) {
        var sql = "SELECT likes FROM Posts WHERE id = " + request.params.id;
        connection.query(sql, function (error, results, fields){
            if (error)
                throw error;
            reply(results);
        });
    }
});

//Increments the likes field in the posts table by 1 each time it is called
server.route({
    method: 'PUT',
    path: '/post/addlikes/{id}',
    handler: function (request, reply) {
        var sql = "UPDATE Posts SET likes=likes+1 WHERE id = " + request.params.id; //WHERE POSTS ID = INCOMING ID
        console.log(sql);
        connection.query(sql, function (error, results, fields){
            if (error)
                throw error;
            reply('Like incremented');
        });
    }
});

//COMMENTS TABLE QUERIES

//get comments from a post
//Get the comments of a post associate with a specific post ID
//It receives the post ID as a paramater and retrieves all the comment fields from that post
server.route({
    method: 'GET',
    path: '/comment/getcomment/{id}',
    handler: function (request, reply) {
        var sql = 'SELECT * FROM Comments WHERE id = ' + request.params.id; //select all comments where comment id = incoming id
        console.log(sql);
        connection.query(sql, function (error, results, fields){
            if (error) 
                throw error;
            reply(results);
        });
    }
});

//Add a comment to the comment table
//It contains a post ID so the comment knows where it attaches it, the userName of the commenter, and a comment body
//Comments cannot be liked
server.route({
    method: 'POST',
    path: '/comment/addcomment',
    handler: function (request, reply) {
        var id = request.payload.id;
        var userName = request.payload.userName;
        var body = request.payload.body;
        var sql = "INSERT INTO Comments (id, userName, body) VALUES (" + "'" + id + "'" +", "+ "'" + userName + "'" + ", " + "'" + body + "'" +")";
        console.log(sql);
        connection.query(sql, function (error, results, fields){
            if (error)
                throw error;
            reply('Comment added');
        });
    }
});

//get voting history
//Returns the entire voting history table
server.route({
    method: 'GET',
    path: '/gethistory',
    handler: function (request, reply) {
        connection.query('SELECT * FROM History', function (error, results, fields) {
            if (error)
                throw error;
            reply(results);
        });
    }
});

//search by issues
//Search all users by issues, and only returns those who are not voters
server.route({
    method: 'GET',
    path: '/searchbyissues/{issue}',
    handler: function (request, reply) {
        var sql = "SELECT * FROM Issues NATURAL JOIN Users WHERE " + encodeURIComponent(request.params.issue) + "= 1 AND office != 'Voter'";
        connection.query(sql, function (error, results1) {
            if (error) {
                throw error;
            }
            reply(results1);
        });
    }
});

//search by zipcode 
//Searches all users by zipcode, and only returns those who are not voters
server.route({
    method: 'GET',
    path: '/searchbyzip/{zipcode}',
    handler: function (request, reply) {
        var sql = "SELECT * FROM Users WHERE zipCode ='" + encodeURIComponent(request.params.zipcode) + "' AND office != 'Voter'";
        connection.query(sql, function (error, results) {
            if (error) {
                throw error;
            }
            reply(results);
        });
    }
});


// server.route({
//     method: 'POST',
//     path: '/user',
//     handler: function (request, reply) {
//       reply('User Added: ' + request.payload['lName'] + ', ' + request.payload['fName']);
//     }
// });

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         console.log('Server processing /name request');
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
