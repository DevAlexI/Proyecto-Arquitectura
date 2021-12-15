//const path = require('path');
const faker = require('faker');
//const fs = require('fs');

let result, data1, data2;

const sum = (req, res) => {
    //Regresar el resultado de la suma
    data1 = faker.datatype.number();
    data2 = faker.datatype.number();
    result = data1 + data2;
    res.status(201).send({"Resultado": result});
};

const substract = (req, res) => {
    //Regresar el resultado de la resta
    data1 = faker.datatype.number();
    data2 = faker.datatype.number();

    result = data1 - data2;
    res.status(201).send({"Resultado": result});
};

const multiply = (req, res) => {
    //Regresar el resultado de la multiplicación
    data1 = faker.datatype.number();
    data2 = faker.datatype.number();

    result = data1 * data2;
    res.status(201).send({"Resultado": result});

};

const divide = (req, res) => {
    //Regresar el resultado de la división
    data1 = faker.datatype.number();
    data2 = faker.datatype.number();

    result = data1 / data2;
    res.status(201).send({"Resultado": result});
};

module.exports = {
    sum,
    substract,
    multiply,
    divide
};
