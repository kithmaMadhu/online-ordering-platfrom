 function index(){

const app = require('express')();
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');  
const PORT = 8081;

const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

const connection = mysql.createConnection({
    hostname: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'online_ordering_platform'
})

app.listen(
	PORT,
	() => console.log(`it's alive on http://localhost:${PORT}`)
)

//landing page
app.get('/', (req, res) => {
    res.send('Hello!!!');
});

//view products
app.get('/products', (req, res) => {
    console.log("Fetching All products")
    const queryString = "SELECT * FROM products"

    connection.query(queryString, (err, rows, fields) => {
        console.log("Successfully fetched products")
        res.json(rows)
    })
});

//create product
app.post('/product_create', (req, res) => {
    console.log("Creating a new product..")

    const product_id = req.body.product_id
    const product_name = req.body.product_name
    const unit_price = req.body.unit_price
    const units_in_store = req.body.units_in_store

    const queryString = "INSERT INTO products VALUES (?, ?, ?, ?)"
    connection.query(queryString, [product_id, product_name, unit_price, units_in_store], (err, results, fields) => {
        if (err){
            console.log("Failed to insert new product: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new product with product_id: ", results.insertId); //
        res.end()
    })
    res.end()
})

//view detailed information about a given product 
app.get('/products/:id', (req, res) => {
    console.log("Fetching product with product_id: " + req.params.id)
    const productId = req.params.id
    const queryString = "SELECT * FROM products WHERE product_id = ?"

    connection.query(queryString, [productId], (err, rows, fields) => {
        console.log("Successfully fetched product with product_id: " + req.params.id)
        res.json(rows)
    })
});

//update a given product
app.put('/products/:id', (req, res) => {
    console.log("Updating the product with product_id: " + req.params.id)

    const product_name = req.body.product_name
    const unit_price = req.body.unit_price
    const units_in_store = req.body.units_in_store

    const productId = req.params.id
    const queryString = "UPDATE products SET product_name = ?, unit_price = ?, units_in_store = ? WHERE product_id = ?"

    connection.query(queryString, [product_name, unit_price, units_in_store, productId], (err, results, fields) => {
        if (err){
            console.log("Failed to update product: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Updated the product with product_id: ", productId); 
        res.end()
    })
    res.end()
});

//place a new order
app.post('/order_create', (req, res) => {
    console.log("Creating a new order..")

    const order_id = req.body.order_id
    const customer_id = req.body.customer_id
    const order_date = req.body.order_date
    const status = req.body.status

    const product_id = req.body.product_id
    const quantity = req.body.quantity
    const unit_price = req.body.unit_price

    const queryString1 = "INSERT INTO orders VALUES (?, ?, ?, ?)"
    connection.query(queryString1, [order_id, customer_id, order_date, status], (err, results, fields) => {
        if (err){
            console.log("Failed to insert new order: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new order with order_id: ", results.insertId); //
        res.end()
    })

    const queryString2 = "INSERT INTO order_details VALUES (?, ?, ?, ?)"
    connection.query(queryString2, [order_id, product_id, quantity, unit_price], (err, results, fields) => {
        if (err){
            console.log("Failed to insert new order details: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted new order details for order_id: ", results.insertId); //
        res.end()
    })
    res.end()
});

//view previous orders
app.get('/orders', (req, res) => {
    console.log("Fetching All previous orders")

    const order_date = req.body.order_date

    const queryString = "SELECT * FROM orders where order_date < ?"

    connection.query(queryString, [order_date], (err, rows, fields) => {
        console.log("Successfully fetched previous orders")
        res.json(rows)
    })
});

//cancel an order
app.put('/orders/:id', (req, res) => {
    console.log("Cancelling the order with order_id: " + req.params.id)

    const status = req.body.status

    const orderId = req.params.id
    const queryString = "UPDATE orders SET status = ? WHERE order_id = ?"

    connection.query(queryString, [status, orderId], (err, results, fields) => {
        if (err){
            console.log("Failed to cancel the order: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Cancelled the order with order_id: ", orderId); 
        res.end()
    })
    res.end()
});

//view all customers
app.get('/customers/:id', (req, res) => {
    console.log("Fetching customers with customer_id: " + req.params.id)
    const userId = req.params.id
    const queryString = "SELECT * FROM customers WHERE customer_id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
        console.log("Successfully fetched user with user_id: " + req.params.id)
        res.json(rows)
    })
});

return app;

}

module.exports = index

//Swagger Configuration  
// https://phoenixnap.com/kb/install-mysql-ubuntu-20-04
/* const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'online-ordering-platform',  
            version:'1.0.0'  
        }  
    },  
    apis:['index.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
 */