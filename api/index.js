import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import bookroutes from './routes/ToDoRoutes.js';
// dotenv.config();

//  DB1
mongoose
  // .connect("mongodb://localhost:27017/mern-auth")
  .connect("mongodb+srv://rj:rj@cluster0.txxbktr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Connected to DB1');
        // JSON data representing seat information


    // Create instances of Seat model using the JSON data
//     Seat.insertMany(seatData)
//         .then((docs) => {
//             console.log(`${docs.length} seats added to the database`);
//             mongoose.disconnect(); // Close the connection after adding data
//         })
//         .catch((err) => {
//             console.error("Error adding seats:", err);
//             mongoose.disconnect(); // Close the connection in case of error
//         });
})
  .catch((err) => {
    console.log(err);
  });





// const __dirname = path.resolve();

const app = express();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", bookroutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
