import {Sequelize} from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";

describe('ProductRepository tests', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([
            ProductModel,
        ]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            '1',
            'Product 1',
            10,
        )
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: product.id}});

        expect(productModel.toJSON()).toStrictEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    })

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            '1',
            'Product 1',
            10,
        )
        await productRepository.create(product);

        product.changeName('New name');
        product.changePrice(20);

        await productRepository.update(product);

        const productUpdated = await ProductModel.findOne({where: {id: product.id}});

        expect(productUpdated.toJSON()).toStrictEqual({
            id: product.id,
            name: 'New name',
            price: 20,
        });
    })

    it('should find a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            '1',
            'Product 1',
            10,
        )
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: product.id}});
        const productFound = await productRepository.find(product.id);

        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price,
        });
    })

    it('should find all products', async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            '1',
            'Product 1',
            10,
        )
        await productRepository.create(product);
        const product2 = new Product(
            '2',
            'Product 2',
            20,
        )
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
    })
});
