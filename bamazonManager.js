const mysql = require('mysql');
const inquirer = require('inquirer');
const Joi = require('joi');

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

conn.connect(function (err) {
    if (err) throw err;
    repeatToFront();
});

//function to call back using recursion for each questions asked in the first inquirer
function repeatToFront() {

    //====================Inquirer START ===============================
    inquirer.prompt({
        name: "listOfSetMenu",
        type: "list",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ],
        message: "Menu List Options"

    }).then(function (response) {
        var list = response.listOfSetMenu;

        //Switch Statement
        switch (list) {
            case "View Products for Sale":
                conn.query("SELECT * FROM products", function (req, res) {
                    var lineSpace = '\n =============== \n';
                    for (var i = 0; i < res.length; i++) {
                        console.log(`Item ID: ${res[i].item_id} \nNames: ${res[i].product_name} \nPrices: ${res[i].price} \nQuantities: ${res[i].stock_quantity} ${lineSpace}`);
                    };
                })
                setTimeout(repeatToFront, 2000);
                break;

            case "View Low Inventory":

                conn.query("SELECT * FROM products WHERE stock_quantity < 5", function (req, res) {
                    var lineSpace = '\n =============== \n';

                    if (res[0] === undefined) {
                        console.log("\nInventory is fully stocked. Nothing is below 5!");
                    }
                    for (var i = 0; i < res.length; i++) {
                        console.log("\nBelow item needs to be stocked!!\n");
                        console.log(`Item ID: ${res[i].item_id} \nNames: ${res[i].product_name} \nPrices: ${res[i].price} \nQuantities: ${res[i].stock_quantity} ${lineSpace}`);
                    };
                })
                setTimeout(repeatToFront, 2000);
                break;

            case "Add to Inventory":
                conn.query("SELECT * FROM products", function (req, res1) {

                    inquirer.prompt({
                        name: "adding",
                        type: "list",
                        message: "Which of the items would you like to add more to stock?",
                        choices: [
                            "Id#: " + res1[0].item_id + " Product: " + res1[0].product_name,
                            "Id#: " + res1[1].item_id + " Product: " + res1[1].product_name,
                            "Id#: " + res1[2].item_id + " Product: " + res1[2].product_name,
                            "Id#: " + res1[3].item_id + " Product: " + res1[3].product_name,
                            "Id#: " + res1[4].item_id + " Product: " + res1[4].product_name,
                            "Id#: " + res1[5].item_id + " Product: " + res1[5].product_name,
                            "Id#: " + res1[6].item_id + " Product: " + res1[6].product_name,
                            "Id#: " + res1[7].item_id + " Product: " + res1[7].product_name,
                            "Id#: " + res1[8].item_id + " Product: " + res1[8].product_name,
                            "Id#: " + res1[9].item_id + " Product: " + res1[9].product_name,
                        ]
                    }).then(function (res11) {

                        inquirer.prompt({
                            name: "adding1",
                            type: "input",
                            message: "How much would you like to add to " + res11.adding + "?"
                        }).then(function (res111) {

                            const regex = /(?<=Id#: )(.*)(?= Product:)/g;
                            const selected = parseInt(res11.adding.match(regex));
                            const originalQuantity = parseInt(res1[0].stock_quantity);
                            const addedQuantity = (parseInt(res111.adding1) + originalQuantity);
                            console.log(addedQuantity);

                            conn.query(`UPDATE products SET stock_quantity = ${addedQuantity} WHERE item_id = ${selected}`, function (req, res) {

                                console.log(`Updated Product to ${addedQuantity}`);
                            });

                            setTimeout(repeatToFront, 2000);
                        })

                    })
                });
                break;

            case "Add New Product":

                inquirer.prompt([
                    {
                        name: "input",
                        message: "What product would you like to add to your inventory?",
                        type: "input"
                    },
                    {
                        type: "input",
                        message: "What is the price for this item?",
                        name: "price"
                    },
                    {
                        type: "input",
                        message: "How many of this item would you like to stock into your inventory?",
                        name: "stock"
                    },
                    {
                        type: "input",
                        message: "What is the Department Name for this item?",
                        name: "depart"
                    },
                    {
                        type: "confirm",
                        message: "Are you sure?",
                        name: "confirm",
                        default: true
                    }
                ]).then(function (response) {
                    const a = response.input, b = response.depart, c = response.price, d = response.stock;

                    conn.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${a}', '${b}', '${c}', '${d}')`);

                    console.log(`\nNew Product has been added!\n=-=-=-=-=-=-=-=\nProduct: ${a}\nDepartment: ${b}\nPrice: ${c}\nStock Quantity: ${d}\n`);

                    setTimeout(repeatToFront, 4000);
                });
                break;

            default:
                process.exit();
        }
    })
    //====================Inquirer END ===============================

};