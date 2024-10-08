import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import EmployeeRoutes from './routes/EmployeeRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

//  DB1
mongoose
  // .connect("mongodb://127.0.0.1:27017/EMS")
  .connect("mongodb+srv://rj:rj@cluster0.txxbktr.mongodb.net/Ems?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Connected to DB1');
        // JSON data representing seat information

})
  .catch((err) => {
    console.log(err);
  });



const app = express();


const corsOptions = {
  origin: 'https://ems-client-flame.vercel.app', // Only this origin is allowed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true  // Allow credentials (e.g., cookies) to be sent with requests
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// const __dirname = path.resolve();


// app.use(express.static(path.join(__dirname, '/client/dist')));


app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// app.use('/', (req, res) => res.json({message: 'server running'}));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/employees', EmployeeRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });
