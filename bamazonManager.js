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

        conn.query("")
    })
//====================Inquirer END ===============================

};