import mongoose from 'mongoose'
import config from "config"

const connect = async () => {
    const MONGODB_URL = config.get<string>('MONGODB_URL')
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Connected to DB')
       }catch (e) {
            console.error('could not connect to db')
            process.exit(1)
      }
}

export default connect