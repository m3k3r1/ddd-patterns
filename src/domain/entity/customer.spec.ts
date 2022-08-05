import Customer from "./customer";
import Address from "./address";

describe(
    "Customer unit tests", () => {
        it("should throw error when id is empty", () => {
            expect(() => {
                const customer = new Customer("", "John");
            }).toThrowError("Id is required");
        });
        it("should throw error when name is empty", () => {
            expect(() => {
                const customer = new Customer("123", "");
            }).toThrowError("Name is required");
        });
        it("should change name", () => {
            const customer = new Customer("123", "John");
            customer.changeName("Jane");
            expect(customer.name).toBe("Jane");
        });
        it("should throw error when name is changed to empty", () => {
            const customer = new Customer("123", "John");
            expect(() => {
                customer.changeName("");
            }).toThrowError("Name is required");
        })
        it("should activate customer", () => {
            const customer = new Customer("123", "John");
            const address = new Address("Main St", "New York", "123", "10001");
            customer.Address = address;
            customer.activate();
            expect(customer.isActive()).toBe(true);
        });
        it("should throw error when address is not set", () => {
            const customer = new Customer("123", "John");
            expect(() => {
                customer.activate();
            }).toThrowError("Address is mandatory to activate customer");
        });
        it("should deactivate customer", () => {
            const customer = new Customer("123", "John");
            const address = new Address("Main St", "New York", "123", "10001");
            customer.Address = address;
            customer.activate();
            expect(customer.isActive()).toBe(true);
            customer.deactivate();
            expect(customer.isActive()).toBe(false);
        })
        it('should add reward points', () => {
            const customer = new Customer("123", "John");
            expect(customer.rewardPoints).toBe(0);
            customer.addRewardPoints(10);
            expect(customer.rewardPoints).toBe(10);
            customer.addRewardPoints(10);
            expect(customer.rewardPoints).toBe(20);
        })
    })
