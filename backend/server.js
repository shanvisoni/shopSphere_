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


// app.get('/',(req,res)=>{
//     res.send({msg:"welcome to ecommerce app"})
// })
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'client/build')));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
//   }

const PORT=process.env.PORT || 5080;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})


