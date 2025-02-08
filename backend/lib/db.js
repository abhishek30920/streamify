import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Add connection pool settings
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    // Add connection state listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Instead of exiting, you might want to implement retry logic
    // for production environments
    if (process.env.NODE_ENV === 'production') {
      console.log('Retrying connection...');
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectDB();
    } else {
      process.exit(1);
    }
  }
};