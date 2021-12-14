//deberas de utilizar faker para generar los datos
const path = require('path');
const faker = require('faker');
const fs = require('fs');
const LINE_ENDING = require('os').EOL;
const SHIPMENT_FILE_PATH = path.resolve('./shipment-generated.txt');

module.exports = {
    createShipment: function (req, res) {
        let shipments = [];
        //debera de simular un envio con dirección un precio y una persona con sus datos
        const fd = fs.openSync(SHIPMENT_FILE_PATH, 'a');
        shipments.push({
            "Direccion": faker.address.streetAddress(),
            "Precio": faker.commerce.price(),
            "Persona":
            {
                "Nombre completo": faker.name.firstName() + ' ' + faker.name.lastName(),
                "Correo": faker.internet.email(),
                "Tarjeta credito": faker.finance.creditCardNumber()
            }
        });

        fs.appendFileSync(fd, JSON.stringify(shipments) + LINE_ENDING, 'utf8');
        return res.status(201).send({shipments});
    },

    changeStatus: function (req, res) {
        let status =[];
        //Debera de retornar una dirección random
        // codigo de respuesta 201
        // data la direcciòn random
        //res.json({addres: ""});
        let data = faker.address.streetAddress();
        status.push({
            "Address": data
        });
        res.status(201).json({status});
    }
};
