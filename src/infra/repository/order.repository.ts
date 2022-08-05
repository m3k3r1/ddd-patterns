import OrderRepositoryInterface from "../../domain/repository/order-repository";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    product_id: item.productId
                }
            })
         },
        {include: [{"model": OrderItemModel}]}
        );
    }

    find(id: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    findAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    update(entity: Order): Promise<void> {
        return Promise.resolve(undefined);
    }

}
