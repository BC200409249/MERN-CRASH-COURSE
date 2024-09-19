import Product from '../models/product.model.js'
import mongoose from 'mongoose'



export const  getProducts = async (req, res)=>{

    try {
        const products = await Product.find({})
        res.status(200).json({success: true, data: products })
    } catch (error) {
        console.log('Error in creating products', error.message)
        res.status(500).json({success: false , message:'Server error'})
    }

}

export const createProduct =async (req, res)=>{

    const product = req.body//user send data
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false , message: 'Please provide all the fields'})
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error('Error in creating product', error.message)
        res.status(500).json({success: false, message:'Server error'})
    }
}

export const updateProduct = async (req, res)=>{

    const {id} = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){

        console.log('Object ID is invalid')
        res.status(404).json({success: false , message: 'Inavalid product ID'})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({success: true , data: updatedProduct})
    } catch (error) {
        console.log('Error in updating product', error.message)
        res.status(500).json({success: false , message: 'Server error'})
    }
}

export const deleteProduct = async (req, res)=>{

    const {id} = req.params
    console.log('id:', (id))
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: 'product deleted'})
    } catch (error) {
        console.log('Error in deleting products:',  error.message)
        res.status(404).json({success: false, message: 'product not found' })
    }
}