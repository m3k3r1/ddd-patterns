import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/entity/order_items";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";


describe('OrderRepository tests', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'John Doe');
        const address = new Address('street', 'City', '123', 'State');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            2,
            product.id
        );

        const orderRepository = new OrderRepository();
        const order = new Order('1', customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customer_id: '123',
            total: 20,
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: product.id,
            }]
        })

    });

    it('should find an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'John Doe');
        const address = new Address('street', 'City', '123', 'State');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            2,
            product.id
        );

        const orderRepository = new OrderRepository();
        const order = new Order('1', customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        const orderFound = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFound.id,
            customer_id: orderFound.customerId,
            total: orderFound.total(),
            items: [{
                id: orderFound.items[0].id,
                name: orderFound.items[0].name,
                price: orderFound.items[0].price,
                quantity: orderFound.items[0].quantity,
                order_id: order.id,
                product_id: product.id,
            }]
        })
    });

    it('should find all orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', 'John Doe');
        const address = new Address('street', 'City', '123', 'State');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            2,
            product.id
        );

        const orderItem2 = new OrderItem(
            '2',
            product.name,
            product.price,
            2,
            product.id
        );

        const orderRepository = new OrderRepository();
        const order = new Order('1', customer.id, [orderItem]);
        const order2 = new Order('2', customer.id, [orderItem2]);
        await orderRepository.create(order);
        await orderRepository.create(order2);

        const ordersFound = await orderRepository.findAll();
        expect(ordersFound).toEqual([order, order2]);
    });
});
