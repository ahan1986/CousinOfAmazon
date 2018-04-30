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
                        "Id#: "+res1[0].item_id+ " Product: " + res1[0].product_name,
                        "Id#: "+res1[1].item_id+ " Product: " + res1[1].product_name,
                        "Id#: "+res1[2].item_id+ " Product: " + res1[2].product_name,
                        "Id#: "+res1[3].item_id+ " Product: " + res1[3].product_name,
                        "Id#: "+res1[4].item_id+ " Product: " + res1[4].product_name,
                        "Id#: "+res1[5].item_id+ " Product: " + res1[5].product_name,
                        "Id#: "+res1[6].item_id+ " Product: " + res1[6].product_name,
                        "Id#: "+res1[7].item_id+ " Product: " + res1[7].product_name,
                        "Id#: "+res1[8].item_id+ " Product: " + res1[8].product_name,
                        "Id#: "+res1[9].item_id+ " Product: " + res1[9].product_name,
                    ]
                }).then(function(res11) {
                    
                    inquirer.prompt({
                        name: "adding1",
                        type: "input",
                        message: "How much would you like to add to " + res11.adding + "?"
                    }).then(function(res111) {
                        
                        const regex = /(?<=Id#: )(.*)(?= Product:)/g;
                        const selected = parseInt(res11.adding.match(regex));
                        const originalQuantity = parseInt(res1[0].stock_quantity);
                        const addedQuantity = (parseInt(res111.adding1) + originalQuantity);
                        console.log(addedQuantity);

                        conn.query(`UPDATE products SET stock_quantity = ${addedQuantity} WHERE item_id = ${selected}`, function(req,res) {

                            console.log(`Updated Product to ${addedQuantity}`);
                        });
                        
                        setTimeout(repeatToFront, 2000);
                    })

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