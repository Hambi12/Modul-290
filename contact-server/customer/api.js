const customer = require('./contoller');
module.exports = app => {
    //Create a new customer (SQL-Insert)
    app.post("/customer", customer.create);

    //Retrieve all customers (SQL-SELECT)
    app.get('/customers', customer.findAll);

    //Update a customer with customerId (SQL-UPDATE)
    app.put('/customer/:id', customer.update);

    //Delete all Customers
    app.delete('/customers', customer.removeAll);

    //Delete by Id
    app.delete('/customer/:id', customer.remove);

    //find customers by id
    app.get('/customer/:id', customer.findOne);

}
