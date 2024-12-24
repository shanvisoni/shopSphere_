// import mongoose from "mongoose";
// import Colors from "colors";

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`Connected to MongoDB Database at ${conn.connection.host}`.green);
//     } catch (error) {
//         console.log(`Error in MongoDB ${error}`.bgRed.white);
//     }
// }

// export default connectDB;









import mongoose from "mongoose";
import Colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,  // Specify the database name here
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log(`Connected to MongoDB Database at ${conn.connection.host}`.green);
    } catch (error) {
        // console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;
