require("dotenv").config();

var mysql = require('mysql');
var inquirer = require('inquirer');
const cTable = require("console.table");


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
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (error, data) {
        if (error) throw error;
        console.table("\n-----------------------" + "Products" + "------------------------", data);
        newOrder();
    })
}

function newOrder() {
    inquirer.prompt([{
        type: "confirm",
        name: "choice",
        message: "Would you like to place an order?"
    }]).then(function (answer) {
        if (answer.choice) {
            buyStuff();
        } else {
            console.log('Thank you for shopping at Bamazon!');
            connection.end();
        }
    })
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
            var newStock = (res[0].stock_quantity - answer.howMany);

            for (var i = 0; i < res.length; i++) {
                if (answer.howMany > res[i].stock_quantity) {
                    console.log('Insufficient Quantity');
                    buyStuff();
                } else {
                    console.log("===================================" + "\nAwesome! We have that in stock!" + "\n===================================");
                    console.log("You've selected:");
                    console.log("Item: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nQuantity: " + answer.howMany);
                    console.log("Total: " + res[i].price * answer.howMany + "\n===================================" + "\nThank you or shopping at Bamazon!" + "\n===================================");
                    //console.log(newStock);
                    function updateStock() {
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        }, {
                            item_id: answer.itemID
                        }
                        ])
                    }
                    updateStock();
                    consoleTable();
                }

            }
        })

    })
}
