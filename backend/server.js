import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from'./routes/productRoutes.js'


dotenv.config();
connectDB();

const app=express()


app.use(cors({
  origin: "http://localhost:5173",
  origin: "https://shopsphere-suwf.onrender.com",
  credentials: true,
}));

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Backend is running');
});
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

const PORT=process.env.PORT || 5080;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})


