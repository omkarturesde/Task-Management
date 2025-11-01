import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const connectToDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Database Connected');
    })
    .catch((err) => {
      console.log('Database Connection failed', err);
    });
};
