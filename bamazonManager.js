const mysql = require('mysql');
const inquirer = require('inquirer');
const Joi = require('joi');

const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "vtr4k8hp",
    database: "bamazon"
});

conn.connect(function (err) {
    if (err) throw err;
    repeatToFront();
});

function repeatToFront() {

    //====================Inquirer START ===============================
    inquirer.prompt({
        name: "listOfSetMenu",
        type: "list",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
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

                break;

            case "View Low Inventory":

                conn.query("SELECT * FROM products WHERE stock_quantity < 5", function (req, res) {
                    var lineSpace = '\n =============== \n';
                    for (var i = 0; i < res.length; i++) {
                        console.log(`Item ID: ${res[i].item_id} \nNames: ${res[i].product_name} \nPrices: ${res[i].price} \nQuantities: ${res[i].stock_quantity} ${lineSpace}`);
                    };
                })

                break;

            case "Add to Inventory":
                conn.query("SELECT * FROM products", function(req, res1) {                  
                
                inquirer.prompt({
                    name: "adding",
                    type: "list",
                    message: "Which of the items would you like to add more to stock?",
                    choices: [
                        res1[0].product_name,
                        res1[1].product_name,
                        res1[2].product_name,
                        res1[3].product_name,
                        res1[4].product_name,
                        res1[5].product_name,
                        res1[6].product_name,
                        res1[7].product_name,
                        res1[8].product_name,
                        res1[9].product_name
                    ]
                })
            });
                break;

            case "Add New Product":
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].item_id);
                };
                break;


        }


    })
    //====================Inquirer END ===============================

};