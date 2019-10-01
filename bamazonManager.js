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
    consoleTable();
});

function consoleTable() {
    connection.query("SELECT item_id, product_name, department, price, stock_quantity FROM products", function (error, data) {
        if (error) throw error;
        console.table("\n-----------------------" + "Products" + "------------------------", data);
        managerActions();
    })
}

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

