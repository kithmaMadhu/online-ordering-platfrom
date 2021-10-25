const request = require('supertest');
const app = require('../server.js');
describe('Customer API', () => {
    it('should show all customers', async () => {
        const res = await request(app).get('/customers')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toHaveProperty('address')
        expect(res.body[0]).toHaveProperty('customer_name')
        expect(res.body.length).toBe(5);
    });
});

describe('Customer API', () => {
    it('should show a customer', async () => {
        const res = await request(app).get('/customers/4')
        expect(res.statusCode).toEqual(200)
        expect(res.body.customer_id).toBe(4)
    });
});

/* describe('Customer API', () => {
    it('should create a new customer', async () => {
        const res = await request(app)
            .post('/customers')
            .send({
                customer_id: 6,
                customer_name: 'Doe',
                address: 'colombo',
                email: 'bob@doe.com',
                mobile_num: '1234567800'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.customer_id).toBe(6)
    });
}); */

describe('Customer API', () => {
    it('should update a customer', async () => {
        const res = await request(app)
            .put('/customers/6')
            .send({
                customer_id: 6,
                customer_name: 'Bob',
                address: 'colombo',
                email: 'bob@doe.com',
                mobile_num: '0012345678'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.customer_id).toBe(6)
        expect(res.body.customer_name).toBe('Bob')
    });
});

describe('Product API', () => {
    it('should show all products', async () => {
        const res = await request(app).get('/products')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toHaveProperty('product_id')
        expect(res.body[0]).toHaveProperty('product_name')
        expect(res.body[0]).toHaveProperty('units_in_store')
        expect(res.body.length).toBe(4);
    });
});

describe('Product API', () => {
    it('should show a product', async () => {
        const res = await request(app).get('/products/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body.product_id).toBe(2)
    });
});

/* describe('Product API', () => {
    it('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .send({
                product_id: 5,
                product_name: 'Item 5',
                unit_price: 5.00,
                units_in_store: 1500
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.product_id).toBe(5)
    });
}); */ 

describe('Product API', () => {
    it('should update a product', async () => {
        const res = await request(app)
            .put('/products/5')
            .send({
                product_id: 5,
                product_name: 'Item 5_1',
                unit_price: 5.50,
                units_in_store: 5000
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.product_id).toBe(5)
        expect(res.body.product_name).toBe('Item 5_1')
        expect(res.body.unit_price).toBe(5.50)
    });
});

describe('Order API', () => {
    it('should show all orders', async () => {
        const res = await request(app).get('/orders')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toHaveProperty('order_id')
        expect(res.body[0]).toHaveProperty('customer_id')
        expect(res.body[0]).toHaveProperty('status')
        expect(res.body.length).toBe(3);
    });
});

describe('Order API', () => {
    it('should show an order', async () => {
        const res = await request(app).get('/orders/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body.order_id).toBe(2)
    });
});

/* describe('Order API', () => {
    it('should create a new order', async () => {
        const res = await request(app)
            .post('/orders')
            .send({
                order_id: 5,
                customer_id: 2,
                order_date: "2021-10-12",
                status: "active"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.order_id).toBe(5)
    });
}); */ 

describe('Order API', () => {
    it('should show past orders for a customer', async () => {
        const res = await request(app).get('/orders/customer/2')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].customer_id).toBe(2)
        expect(res.body.length).toBe(3)
    });
});

describe('Order API', () => {
    it('should update an order', async () => {
        const res = await request(app)
            .put('/orders/5')
            .send({
                order_id: 5,
                customer_id: 2,
                order_date: '2021-10-12',
                status: 'deleted'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.order_id).toBe(5)
        expect(res.body.customer_id).toBe(2)
        expect(res.body.status).toBe('deleted')
    });
});