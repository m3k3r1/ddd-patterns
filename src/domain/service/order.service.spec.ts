import Order from "../entity/order";
import OrderItem from "../entity/order_items";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe('OrderService unit tests', () => {
    it('should place order', () => {
        const customer = new Customer("1", "John");
        const item1 = new OrderItem("1", "Product 1", 10, 1, "p1");
        const order = OrderService.placeOrder(customer, [item1]);

        expect(order.total()).toBe(10);
        expect(customer.rewardPoints).toBe(5);
    })

    it('should throw error if items are empty', () => {
        const customer = new Customer("1", "John");

        expect(() => OrderService.placeOrder(customer, [])).toThrowError("Order must have at least one item");
    })

    it('should get total of order', () => {
        const item1 = new OrderItem("1", "i1", 10, 1, "p1");
        const item2 = new OrderItem("2", "i2", 20, 1, "p2");
        const item3 = new OrderItem("3", "i3", 15, 2, "p3");

        const order1 = new Order("1", "c1", [item1, item2]);
        const order2 = new Order("2", "c2", [item3]);

        const orders = [order1, order2];

        const total = OrderService.getTotal(orders);

        expect(total).toBe(60);
    })
})
