const request = require("supertest");
const app = require('../app');
//const jest = require('@jest/globals');


describe("GET /products", () => {
  test("It responds with an array of products", async () => {
    const response = await request(app).get("/products");
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("product_id");
    expect(response.body[0]).toHaveProperty("product_name");
    expect(response.body[0]).toHaveProperty("unit_price");
    expect(response.body[0]).toHaveProperty("units_in_store");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /product_create", () => {
  test("It responds with the newly created product", async () => {
    const newProduct = await request(app)
      .post("/product_create")
      .send({
        product_id: 3,
        product_name: "New product",
        unit_price: 12,
        units_in_store: 15
      });

    // make sure we add it correctly
    //expect(newProduct.body).toHaveProperty("product_id");
    expect(newProduct.body.product_name).toBe("New product");
    expect(newProduct.statusCode).toBe(200);

    // make sure we have 3 students now
    const response = await request(app).get("/products");
    expect(response.body.length).toBe(3);
  });
});