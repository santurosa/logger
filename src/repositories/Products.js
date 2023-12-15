import ProductDTO from "../dto/product.js";

export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    }
    getProducts = async (limit, page, sort, title, category, stock) => {
        const products = await this.dao.getProducts(limit, page, sort, title, category, stock);
        return products;
    }
    getProductById = async (id) => {
        const product = await this.dao.getProductById(id);
        return product;
    }
    createProducts = async (product) => {
        const productToInsert = new ProductDTO(product);
        const result = await this.dao.createProducts(productToInsert);
        return result;
    }
    upgrateProduct = async (id, product) => {
        const result = await this.dao.upgrateProduct(id, product);
        return result;
    }
    deleteProduct = async (id) => {
        const result = await this.dao.deleteProduct(id);
        return result;
    }
}