import { UserModel, ProductModel, CategoryModel, BrandModel } from '../models'

class AdminActionController {

    // Users and Vendors
    async createUser(req,res,next){
        try {
            const user = new UserModel(req.body)
            await user.save()
            res.status(201).send(user)
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(200).send("User already exit");
            }
            res.status(500).send(error);
        }
    }

    async getAll (req,res,next) {
        try {
            const { type } = req.query;
            const users = await UserModel.find({ type })
            res.status(200).json(users)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async updateUser(req,res,next){
        try {
            const { type } = req.query;
            await UserModel.findByIdAndUpdate(
                req.query._id,
                req.body,
            );
            const users = await UserModel.find({ type })
            res.status(200).json(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async deleteUser(req,res,next) {
        try {
            const { type } = req.query;
            await UserModel.findByIdAndDelete(
                req.query._id
            )
            const users = await UserModel.find({ type })
            res.status(200).json(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Products
    async createProduct(req,res,next){
        try {
            const brand = await BrandModel.findOne({ name: req.body.brand });
            const category = await CategoryModel.findOne({
                name: req.body.category,
            });
            const vendor = await UserModel.findOne({ email : req.body.email })
            req.body.brand = brand._id;
            req.body.category = category._id;
            req.body.vendor = vendor._id;
            const product = new ProductModel(req.body);
            await product.save();
            res.status(201).send(product);
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(200).send("product already exit");
            }
            res.status(500).send(error);
        }
    }

    async getAllProduct (req,res,next) {
        try {
            const products = await ProductModel.find()
                .populate("vendor")
                .populate("category")
                .populate("brand");
            res.status(200).json(products)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async updateProduct(req,res,next){
        try {
            await ProductModel.findByIdAndUpdate(
                req.query._id,
                req.body,
            );
            const products = await ProductModel.find()
                .populate("vendor")
                .populate("category")
                .populate("brand");
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async deleteProduct(req,res,next) {
        try {
            await ProductModel.findByIdAndDelete(
                req.query._id
            )
            const products = await ProductModel.find()
                .populate("vendor")
                .populate("category")
                .populate("brand");
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Categories
    async createCategory(req,res,next){
        try {
            const category = new CategoryModel(req.body)
            await category.save()
            res.status(201).send(category)
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(200).send("Category already exit");
            }
            res.status(500).send(error);
        }
    }

    async getAllCategory (req,res,next) {
        try {
            const { page } = req.query;
            const options = {
                page : parseInt(page,10),
                limit : 10
            }
            const category = await CategoryModel.paginate({ },options)
            res.status(200).json(category)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async updateCategory(req,res,next){
        try {
            const category = await CategoryModel.findByIdAndUpdate(
                req.query._id,
                req.body,
                { new : true }
            );
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async deleteCategory(req,res,next) {
        try {
            await CategoryModel.findByIdAndDelete(
                req.query._id
            )
            res.status(200).send("done");
        } catch (error) {
            res.status(500).send(error)
        }
    }
    
    // brand
    async createbrand(req,res,next){
        try {
            const brand = new BrandModel(req.body)
            await brand.save()
            res.status(201).send(brand)
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                return res.status(200).send("Brand already exit");
            }
            res.status(500).send(error);
        }
    }

    async getAllBrand (req,res,next) {
        try {
            const { page } = req.query;
            const options = {
                page : parseInt(page,10),
                limit : 10
            }
            const brand = await BrandModel.paginate({ },options)
            res.status(200).json(brand)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async updateBrand(req,res,next){
        try {
            const brand = await BrandModel.findByIdAndUpdate(
                req.query._id,
                req.body,
                { new : true }
            );
            res.status(200).send(brand)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async deleteBrand(req,res,next) {
        try {
            await BrandModel.findByIdAndDelete(
                req.query._id
            )
            res.status(200).send("done");
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new AdminActionController()

