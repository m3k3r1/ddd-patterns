import CustomerRepositoryInterface from "../../domain/repository/customer-repository";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            number: entity.address.number,
            zip: entity.address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }


        const customer =  new Customer(
            customerModel.id,
            customerModel.name,
        );

        const address = new Address(
            customerModel.street,
            customerModel.city,
            customerModel.number,
            customerModel.zip,
        );

        customer.changeAddress(address)

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map((customerModels) => {
            let customer = new Customer(customerModels.id, customerModels.name);
            customer.addRewardPoints(customerModels.rewardPoints);
            const address = new Address(
                customerModels.street,
                customerModels.city,
                customerModels.number,
                customerModels.zip,
            );
            customer.changeAddress(address);
            if (customerModels.active) {
                customer.activate();
            }
            return customer;
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            number: entity.address.number,
            zip: entity.address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id,
            }
        });
    }

}
