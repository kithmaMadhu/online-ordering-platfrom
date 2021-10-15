 const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

const connection = mysql.createConnection({
    hostname: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'online_ordering_platform'
})

//create product
export async function createProduct(product_id, product_name, unit_price, units_in_store) {

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
    return insertId
}
 