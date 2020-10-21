import { ProductModel } from '../models' 

class UserActionController {
    
    async getAllProducts(req, res, next) {
        try {
            const products = await ProductModel.find()
                .populate("User")
                .populate("Category")
                .populate("Brand");
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error)
        }
    }

}

module.exports = new UserActionController()