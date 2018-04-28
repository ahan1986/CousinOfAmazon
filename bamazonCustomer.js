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
    askingTwoQuestions();
});

// Inquirer - to ask two questions inside a function to call in the connection
function askingTwoQuestions() {
    inquirer.prompt({
        name: "firstQuestion",
        type: "input",
        message: "What is the ID of the product you would like to buy? (1 - 10)"
    }).then(function (answer) {
        //===== query start

        conn.query('SELECT * FROM products WHERE ?', { item_id: answer.firstQuestion }, function (err, res) {

        function incaseOfInsufficient() {
            inquirer.prompt({
                name: "secondQuestion",
                type: "input",
                message: "You have selected to buy ID #" + answer.firstQuestion + ", which is \n\n" + res[0].product_name + ". \n\nOne of this product is $" + res[0].price + "\n\nHow many would you like to buy?  "
            }).then(function (answer2) {
                //parsing the answer to a number
                var numbered = parseInt(answer2.secondQuestion);

                if ((numbered > parseInt(res[0].stock_quantity))) {
                    console.log("Insufficient quantity!");

                    setTimeout(incaseOfInsufficient, 2000);
                    
                } else {
                    console.log("You have asked to buy " + numbered + ". \nThe total price is $" + (parseInt(res[0].price) * numbered)+".00\n\n\n");
                    
                    setTimeout(buyAgain, 2000);
                }

            });
        };
        incaseOfInsufficient();
            //=====query   end   

        });

    });
};

function buyAgain() {
    inquirer.prompt({
        name:"again",
        type:"list",
        message: "Would you like to buy again?",
        choices: [
            "Yes",
            "No"
        ]
    }).then(function(res) {
        if(res === "Yes") {
            askingTwoQuestions()
        } else {
            console.log("Thank You for shopping at Bamazon!")
            process.exit();
        }
    })

}