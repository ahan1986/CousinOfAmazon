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

function repeatToFront() {

//====================Inquirer START ===============================
    inquirer.prompt({
        name:"listOfSetMenu",
        type: "list",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ],
        message: "Menu List Options"
    }).then(function(response) {
        var list = response.listOfSetMenu;



    //Switch
    switch(list) {
        case "View Products for Sale":
        conn.query("SELECT * FROM products", function(req, res){
            var lineSpace = '\n =============== \n';
            for (var i =0; i<res.length; i++) {
                console.log(`Item ID: ${res[i].item_id} \nNames: ${res[i].product_name} \nPrices: ${res[i].price} \nQuantities: ${res[i].stock_quantity} ${lineSpace}`);
            };
        })

        break;

        case "View Low Inventory":

        conn.query("SELECT * FROM products WHERE stock_quantity < 5", function (req, res) {
            var lineSpace = '\n =============== \n';
            for (var i =0; i<res.length; i++) {
                console.log(`Item ID: ${res[i].item_id} \nNames: ${res[i].product_name} \nPrices: ${res[i].price} \nQuantities: ${res[i].stock_quantity} ${lineSpace}`);
            };
        })

        break;

        case "Add to Inventory":
        for (var i =0; i<res.length; i++) {
            console.log(res[i].item_id);
        };
        break;

        case "Add New Product":
        for (var i =0; i<res.length; i++) {
            console.log(res[i].item_id);
        };
        break;


    }

        
    })
//====================Inquirer END ===============================

};