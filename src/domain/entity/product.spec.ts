import Product from "./product";

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new Product('', '', 0);
        }).toThrowError('Id is required');
    })
    it('should throw error when name is empty', () => {
        ;
        expect(() => new Product('1', '', 0)).toThrowError('Name is required');
    })
    it('should throw error when price is less than zero', () => {
        expect(() =>  new Product('1', 'name', -1)
    ).toThrowError('Price is required');
    })
    it('should change name', () => {
        const product = new Product('1', 'name', 1);
        product.changeName('new name');
        expect(product.name).toBe('new name');
    })
    it('should change price', () => {
        const product = new Product('1', 'name', 1);
        product.changePrice(2);
        expect(product.price).toBe(2);
    })
})
