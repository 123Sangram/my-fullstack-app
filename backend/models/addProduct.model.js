const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        productname: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: { 
            type: String,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer"
        }
    },
    {
        timestamps: true
    }
);

const addProduct = mongoose.model("addProduct", ProductSchema);
module.exports = addProduct;
