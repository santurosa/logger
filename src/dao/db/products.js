import mongoose from "mongoose";
import { productsModel } from "../../models/products.js";
import CustomError from "../../service/errors/CustomError.js";
import EErrors from "../../service/errors/enums.js";
import { getByMongooseIdErrorInfo, searchByMongooseIdErrorInfo, upgrateProductDBErrorInfo } from "../../service/errors/info.js";

export default class Products {

    getProducts = async (limit, page, sort, title, category, stock) => {
        try {
            const filter = {};

            if (title) {
                filter.title = { $regex: title, $options: "i" }
            }

            if (category) {
                filter.category = { $regex: category, $options: "i" }
            }

            if (stock === "true") {
                filter.stock = { $gt: 0 };
            }

            const sortNumber = sort === "asc" ? { price: 1 } : sort === "des" ? { price: -1 } : {};

            const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate(filter, { limit, page, sort: sortNumber });
            const products = docs.map(product => product.toObject());
            return { products, hasPrevPage, hasNextPage, nextPage, prevPage };
        } catch (error) {
            throw error;
        }
    }

    getProductById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.createError({
                    name: "Product get error",
                    cause: getByMongooseIdErrorInfo(id),
                    message: "Error Getting Product by ID",
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
            const result = await productsModel.findById(id);
            if (!result) {
                CustomError.createError({
                    name: "Product get error",
                    cause: searchByMongooseIdErrorInfo(id),
                    message: "Error Getting Product by ID",
                    code: EErrors.DATABASE_ERROR
                })
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    createProducts = async (product) => {
        try {
            const result = await productsModel.create(product);
            return result;
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.createError({
                    name: "Product delete error",
                    cause: getByMongooseIdErrorInfo(id),
                    message: "Error Deleting Product by ID",
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
            const result = await productsModel.deleteOne({ _id: id });
            if (result.deletedCount == 0) {
                CustomError.createError({
                    name: "Product delete error",
                    cause: searchByMongooseIdErrorInfo(id),
                    message: "Error Deleting Product by ID",
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    upgrateProduct = async (id, upgrate) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                CustomError.createError({
                    name: "Product update error",
                    cause: getByMongooseIdErrorInfo(id),
                    message: "Error updating Product by ID",
                    code: EErrors.INVALID_PARAMS_ERROR
                })
            }
            const result = await productsModel.updateOne({ _id: id }, upgrate);
            if (result.modifiedCount == 0) {
                CustomError.createError({
                    name: "Product update error",
                    cause: upgrateProductDBErrorInfo(upgrate),
                    message: "Error updating Product by ID",
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}
