import Order from "./order";
import OrderItem from "./order_items";

describe(
    "Order unit tests", () => {
        it("should throw error if id is empty", () => {
            expect(() => new Order("", "", [])).toThrowError("Id is required");
        });
        it("should throw error if customerId is empty", () => {
            expect(() => new Order("123", "", [])).toThrowError("CustomerId is required");
        });
        it("should throw error if items are empty", () => {
            expect(() => new Order("123", "123", [])).toThrowError("Items are required");
        });
        it("should return total", () => {
            const item1 = new OrderItem("123", "item1", 10, 1, "p1");
            const item2 = new OrderItem("123", "item2", 15, 2, "p2");

            const order = new Order("123", "123", [item1, item2]);

            expect(order.total()).toBe(40);
        });
        it("should throw error if quantity is less than 1", () => {
            const item1 = new OrderItem("123", "item1", 10, 0, "p1");
            const item2 = new OrderItem("123", "item2", 15, -1, "p2");
            expect(() => new Order("123", "123", [item1, item2])).toThrowError("Quantity needs to be greater than 0");
        });
    }
)
