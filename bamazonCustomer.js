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

    function listItems() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
            }
            console.log(table.toString() + "\n");
            buyStuff();
        });
    }
}


function buyStuff() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "Please enter the Item ID for the product you would like to buy",
        validate: function (value) {
            if (!isNaN(value) && (value > 0 && value <= 10)) {
                return true;
            }
            return "Please enter a numerical value between 1-10";
        }
    }, {
        name: "howMany",
        type: "input",
        message: "How many do you want?",
        validate: function (value) {
            if (!isNaN(value) && value > 0) {
                return true;

            }
            return "Please enter a numerical value";
        }
    }]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE item_id=?", answer.itemID, function (err, res) {
            if (answer.howMany > res[0].stock_quantity) {
                console.log('Insufficient Quantity');
                newOrder();
            } else {
                console.log("===================================" + "\nAwesome! We have that in stock!" + "\n===================================");
                console.log("You've selected:");
                console.log("Item: " + res[0].product_name + "\nDepartment: " + res[0].department_name + "\nPrice: " + res[0].price + "\nQuantity: " + answer.howMany);
                console.log("Total: " + res[0].price * answer.howMany + "\n===================================");
                connection.end();
            }

        })

    })
}

function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'
    }]).then(function (answer) {
        if (answer.choice) {
            buyStuff();
        }
        else {
            console.log('Thank you for shopping at Bamazon!');
            connection.end();
        }
    })
};