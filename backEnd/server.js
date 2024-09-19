import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.routes.js'
import path from 'path'


const app = express()
dotenv.config()
app.use(express.json())//to accept JSON data from req.body
const PORT = process.env.PORT || 5000 
const __dirname = path.resolve()

app.use('/api/products', productRoutes)

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, '/frontEnd/dist')))
    
    app.get('*' ,(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontEnd', 'dist', 'index.html'))
    })
}

app.listen(PORT, ()=>{

    connectDB()
    console.log("Server started at http://localhost:" + PORT)
})

