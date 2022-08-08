import OrderRepositoryInterface from "../../domain/repository/order-repository";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_items";

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

    async find(id: string): Promise<Order> {
       const foundOrder = await OrderModel.findOne({
            where: {
                id,
            },
            include: [{"model": OrderItemModel}]
        })

        return new Order(
            foundOrder.id,
            foundOrder.customer_id,
            foundOrder.items.map(item => {
                return new OrderItem(
                     item.id,
                     item.name,
                     item.price,
                     item.quantity,
                     item.product_id
                )
            }),
        )
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll(
            {include: [{"model": OrderItemModel}]}
        )

        return orderModels.map(orderModel => new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(item => {
                return new OrderItem(
                     item.id,
                     item.name,
                     item.price,
                     item.quantity,
                     item.product_id
                )
            }
        )))
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
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
            }, {
                where: {
                    id: entity.id,
                }
            }
        )
    }
}
