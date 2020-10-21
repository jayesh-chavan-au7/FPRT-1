import { UserModel, ProductModel, CategoryModel, BrandModel } from "../models";

class VendorActionController {
    async createProduct(req, res, next) {
        try {
            const brand = await BrandModel.findOne({ name: req.body.brand });
            const category = await CategoryModel.findOne({
                name: req.body.category,
            });
            req.body.brand = brand._id;
            req.body.category = category._id;
            req.body.vendor = req.user._id;
            const product = new ProductModel(req.body);
            await product.save();
            const vendor = await UserModel.findOne({ _id : req.user._id })
            vendor.products = vendor.products.concat( { product : product._id } )
            await vendor.save()
            res.status(201).send(product);
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(200).send("product already exit");
            }
            res.status(500).send(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.find({ vendor : req.user._id })
                .populate("vendor")
                .populate("category")
                .populate("brand");
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async updateProduct(req,res,next) {
        try {
            const product = await ProductModel.findByIdAndUpdate(
                req.query._id,
                req.body,
                { new : true }
            );
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async deleteProduct(req,res,next) {
        try {
            await ProductModel.findByIdAndDelete(
                req.query._id
            )
            res.status(200).send("done");
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new VendorActionController();
