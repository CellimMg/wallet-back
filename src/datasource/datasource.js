import { MongoClient, ObjectId } from 'mongodb';
import dotenv from "dotenv";

dotenv.config({
    path: "../.env"
});

const objectId = ObjectId;
let db;


async function connectDB() {
    const mongoClient = new MongoClient(process.env.MONGO);
    await mongoClient.connect();
    db = mongoClient.db("wallet");

}

export { db, objectId, connectDB };
