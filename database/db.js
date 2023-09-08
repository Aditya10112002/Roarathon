import mongoose from 'mongoose'

export const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewURLParser: true
    })
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.log(error.message);
  }
}

export default Connection;