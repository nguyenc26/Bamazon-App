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
    displayTable();
});

function displayTable () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var listTable = new table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Quantity"],
            colWidths: [10, 30, 30, 10, 15]
        }); 

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].item_id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
        }
        console.log(`\n\n${listTable.toString()}\n\n`);
    });
}
