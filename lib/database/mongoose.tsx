import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// In nextjs you connect to db on every request
// Next.js runs in a serverless environment, serverless functions are stateless, means they start up to handle a request and shut down right after. So, you can't keep a connection open to a database in a serverless function like you would in a traditional express server.
//  This behavior is by design, as it allows serverless functions to scale up and down as needed, as there is no need to manage a persistent connection to a database across many instances of a server.
interface MongooseConnection {
    conn: Mongoose | null;
    Promise: Promise<Mongoose> | null; // type of value this promise resolves to, here it would be an instance of Mongoose if the connection is successful and promise is resolved
}

// If we keep creating new db conn for each req, this might be an overhead, so we create a global conn and reuse it.
let cached : MongooseConnection = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose = { conn: null, Promise: null };
}

export const connectToDatabase = async () => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) {
        throw new Error("MONDODB_URL not found");
    }

    if(!cached.Promise) {
        const opts = {
            bufferCommands: false, // Mongoose buffers model commands (like save, find, etc.) until the connection to the database is established. If bufferCommands is set to false, it will throw an error if you try to execute commands before the connection is ready.
            // bufferMaxEntries: 0,
            // useFindAndModify: false,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        };

        cached.Promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.Promise;
    return cached.conn;
}