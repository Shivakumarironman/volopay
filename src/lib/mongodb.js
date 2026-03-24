import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

let client;
let clientPromise;

if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);

    globalThis._mongoClientPromise = client.connect().catch((error) => {
        globalThis._mongoClientPromise = undefined;
        console.error("MongoDB Connection Error:", error);
        throw error;
    });
}

clientPromise = globalThis._mongoClientPromise;

export default clientPromise;