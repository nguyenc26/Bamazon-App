require("dotenv").config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("cli-table");

var keys = require("./keys.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: keys.mySQL,
    database: 'bamazon_DB'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection successful " + connection.threadId);
});

