import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from'./routes/productRoutes.js'
import path from "path"

dotenv.config();
connectDB();

const app=express()
const __dirname=path.resolve();

app.use(cors({
    origin: [
        "http://localhost:3000",  // Frontend in development
        "https://your-vercel-domain.vercel.app"  // Frontend in production
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
}
   
))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);


// app.get('/',(req,res)=>{
//     res.send({msg:"welcome to ecommerce app"})
// })
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
  }

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.green)
})


