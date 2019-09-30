require("dotenv").config();

var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require("cli-table");

var keys = require("./keys.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: keys.mySQL,
    database: 'bamazon_DB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection successful " + connection.threadId);
    managerActions();
});

function managerActions() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (answers) {
        switch (answers.action) {
            case "View Products for Sale":
                displayTable();
                break;
            case "View Low Inventory":
                //function here
                break;
            case "Add to Inventory":
                //function here
                break;
            case "Add New Product":
                //function here
                break;
        }
    })
}

function displayTable() {
    var table = new Table({
        head: ["Item ID", "Product Name", "Department Name", "Price", "Quantity"],
        colWidths: [10, 30, 30, 10, 15]
    });
    listItems();

    function listItems() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
            }
            console.log(table.toString() + "\n");
            //figure this function out. Promises?? How do I get it to laod after.....
        }).then(function () {
            managerActions();
        });
    }
}