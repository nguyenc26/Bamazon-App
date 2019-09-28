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
    displayTable();
});

function displayTable() {
    var table = new Table({
        head: ["Item ID", "Product Name", "Department Name", "Price", "Quantity"],
        colWidths: [10, 30, 30, 10, 15]
    });
    listItems();

    function listItems () {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
    
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
            }
            console.log(table.toString() + "\n");
            buyProduct();
        });
    }
}

function buyProduct() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "Please enter the Item ID for the product you would like to buy",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return "Please enter a numerical value";
        }
    }, {
        name: "amountProd",
        type: "input",
        message: "How many do you want?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return "Please enter a numerical value";
        }
    }])
}