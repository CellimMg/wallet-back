import { MongoClient, ObjectId } from 'mongodb';
import dotenv from "dotenv";


const objectId = ObjectId;
let db;


async function connectDB() {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();
    db = mongoClient.db("wallet");

}

export { db, objectId, connectDB };
