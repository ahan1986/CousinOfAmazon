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
    askingTwoQuestions();
});

// Inquirer - to ask two questions inside a function to call in the connection
function askingTwoQuestions() {

    conn.query("SELECT * FROM products", function (req, resp) {  //start of part 2 of displaying all the items

        inquirer.prompt({
            name: "firstQuestion",
            type: "list",
            message: "What is the ID of the product you would like to buy?",
            choices: [
                `ID#: ${resp[0].item_id} Product: ${resp[0].product_name} Price $${resp[0].price}`,
                `ID#: ${resp[1].item_id} Product: ${resp[1].product_name} Price $${resp[1].price}`,
                `ID#: ${resp[2].item_id} Product: ${resp[2].product_name} Price $${resp[2].price}`,
                `ID#: ${resp[3].item_id} Product: ${resp[3].product_name} Price $${resp[3].price}`,
                `ID#: ${resp[4].item_id} Product: ${resp[4].product_name} Price $${resp[4].price}`,
                `ID#: ${resp[5].item_id} Product: ${resp[5].product_name} Price $${resp[5].price}`,
                `ID#: ${resp[6].item_id} Product: ${resp[6].product_name} Price $${resp[6].price}`,
                `ID#: ${resp[7].item_id} Product: ${resp[7].product_name} Price $${resp[7].price}`,
                `ID#: ${resp[8].item_id} Product: ${resp[8].product_name} Price $${resp[8].price}`,
                `ID#: ${resp[9].item_id} Product: ${resp[9].product_name} Price $${resp[9].price}`
            ]
        }).then(function (answer) {
            //===== query start

            //using regex positive lookahead and look behind to grab whats between ID and Product from the choices
            var regex = /(?<=ID#: )(.*)(?= Product:)/g;
            var selected = answer.firstQuestion.match(regex);

            conn.query('SELECT * FROM products WHERE ?', { item_id: selected }, function (err, res) {
                console.log(res);
                function incaseOfInsufficient() {
                    inquirer.prompt({
                        name: "secondQuestion",
                        type: "input",
                        message: "You have selected to buy ID #" + res[0].item_id + ", which is \n\n" + res[0].product_name + ". \n\nOne of this product is $" + res[0].price + "\n\nHow many would you like to buy?  "
                    }).then(function (answer2) {
                        //parsing the answer to a number
                        var numbered = parseInt(answer2.secondQuestion);

                        if ((numbered > parseInt(res[0].stock_quantity))) {
                            console.log("Insufficient quantity!");

                            setTimeout(incaseOfInsufficient, 2000);

                        } else {

                            var newStock = (parseInt(res[0].stock_quantity) - numbered);

                            console.log("You have asked to buy " + numbered + ". \nThe total price is $" + (parseInt(res[0].price) * numbered) + ".00\n\n\n");

                            var setWhat = "stock_quantity = " + newStock;
                            var atWhatItemId = "item_id = " + selected;

                            conn.query("UPDATE products SET " + setWhat + " WHERE " + atWhatItemId, function (err, res1) {
                                if (err) console.log("failed");

                                console.log("We have placed your order!");
                            });

                            conn.query("SELECT * FROM products WHERE item_id = " + selected, function (err, res2) {
                                if (err) console.log("error 2");
                                var updatedStock = res2[0].stock_quantity;
                                console.log(`We have ${updatedStock} of ${res[0].product_name} left. \n`);
                            })
                            setTimeout(buyAgain, 2000);

                        }

                    });
                };
                incaseOfInsufficient();
                //=====query   end   

            });

        });

    });// end of part 2 of getting the display of all items

};
//function to ask if the user wants to buy again and if not, it will exit the app
function buyAgain() {
    inquirer.prompt({
        name: "again",
        type: "list",
        message: "Would you like to buy again?",
        choices: [
            "Yes",
            "No"
        ]
    }).then(function (res) {

        if (res.again === "Yes") {
            askingTwoQuestions()
        } else {
            console.log("Thank You for shopping at Bamazon!")
            process.exit();
        }
    })

}