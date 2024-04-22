import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import sql from './db.js';

const STATUS = {
    PENDING: 0,
    PROCESSING: 1,
    SHIPPED: 2,
    FAILED: 3,
    CANCELED: 4,
};

const CatalogsService = process.env.CATALOGS_SERVICE;
const CustomerService = process.env.CUSTOMER_SERVICE;
const PaymentService = process.env.PAYMENT_SERVICE;

await sql`CREATE TABLE IF NOT EXISTS orders (id SERIAL, customer_id INTEGER, product_id INTEGER, payment_id INTEGER, status INTEGER)`;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/orders', async (req, res) => {
    const orders = await sql`SELECT * FROM orders`;

    res.json(orders);
});

app.post('/orders', async (req, res) => {
    const { customer_id, product_id } = req.body;

    const customerRes = await fetch(`${CustomerService}/customer/${customer_id}`);
    const customer = await customerRes.json().catch(() => null);

    if (!customer) {
        res.status(400).send('Invalid customer id!');
        return;
    }

    const orderedProductRes = await fetch(`${CatalogsService}/product/${product_id}/order`, {
        method: 'PATCH',
    });

    if (orderedProductRes.status !== 200) {
        res.status(orderedProductRes.status).send(await orderedProductRes.text());
        return;
    }

    const orderedProduct = await orderedProductRes.json();



    const paymentRes = await fetch(`${PaymentService}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `customer_id=${customer.id}&amount=${orderedProduct.price}`
    });
    const payment = await paymentRes.json();

console.log('Payment ID:', payment);
console.log('ordered Product : ', orderedProduct);

    const [order] = await sql`INSERT INTO orders
        (customer_id, product_id, payment_id, status) VALUES
        (${customer.id}, ${orderedProduct.id}, ${payment.id}, ${STATUS.PENDING}) RETURNING *`;

    res.json(order);
});

app.patch('/order/:id', async (req, res) => {
    const { status } = req.body;

    const [order] = await sql`SELECT * FROM orders WHERE id = ${req.params.id}`;

    if (order.status !== Number(status) && Number(status) === STATUS.CANCELED) {
        await fetch(`${CatalogsService}/product/${order.product_id}/restore`, {
            method: 'PATCH',
        });
    }

    order.status = status;

    await sql`UPDATE orders SET ${sql(order, 'status')} WHERE id = ${order.id}`;

    res.send(`Order #${order.id} has been updated!`);
});

app.listen(process.env.PORT, () => {
    console.log('Orders service is running on port', process.env.PORT);
});