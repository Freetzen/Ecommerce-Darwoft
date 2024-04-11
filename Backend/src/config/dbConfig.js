import 'dotenv/config'
import mongoose from 'mongoose'

const dbConfig = async () => {
 await mongoose.connect(process.env.URLMONGODB)
}

export default dbConfig