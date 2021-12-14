const path = require('path');
const PAYMENT_FILE_PATH = path.resolve('./payment-generated.txt');
const faker = require('faker');
const fs = require('fs');
const LINE_ENDING = require('os').EOL;
const { reject } = require('lodash');

module.exports = {
    create: function (req, res) {
        let price = faker.commerce.price();
        const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
        fs.appendFileSync(fd, price + LINE_ENDING, 'utf8');
        return res.status(201).send(price);
    },

    applyDiscount: function (req, res) {
        let counter = 0;
        let discounts = [];
        let discount, total;
        //debera de restar una cantidad a cada precio en payment-generated.txt
        fs.readFile(PAYMENT_FILE_PATH, {encoding: 'utf8'}, (err, data) => {
            if(err) throw err;
            var payments = data.toString().split("\n");
            for(i in payments) {
                if(payments[i] != ''){
                    counter++;
                    discount = faker.commerce.price();
                    total = parseFloat(payments[i]) - parseFloat(discount);
                    discounts.push({ "ID": counter, "Original": payments[i], "Discount": discount, "Total": total});    
                }
            }
        
            return res.status(200).send({discounts});
        });
    },

    getPromos: function (req, res) {
        res.json([{id: 1, name: 'BUENFIN'},
                  {id: 2, name: 'HOTSALE'}, 
                  {id: 3, name: 'CYBERMONDAY'}, 
                  {id: 4, name: 'BLACKFRIDAY'}, 
                  {id: 5, name: 'PRIMEDAY'}, 
                ]);
    }
};
