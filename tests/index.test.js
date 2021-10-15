const request = require("supertest");
const makeApp = require('../index');
//const jest = require('@jest/globals');

const createProduct = jest.fn()
const getUser = jest.fn()

const app = makeApp({
  createProduct,
  getUser
})

test('Test get product with given id', async () => {
    /* await request(app).post("/products").send({
        product_id: 3,
        product_name: "Item 3",
        unit_price: 32,
        units_in_store: 40
    })
    expect(createProduct.mock.calls.length).toBe(1) */
    expect(
        await connection.query(sql`SELECT product_id, product_name FROM products WHERE product_id=${1}`),
    ).toEqual([{id: 1 , name: expect.any(String)}]); 
})