import { MongoClient } from "mongodb";
import movieValidator from "../schema.js"
import dotenv from "dotenv";

dotenv.config();
export async function DataStorageService(data) 
{
    await setUpDatabase();
    await storeInMongoDB(data);
}

async function storeInMongoDB(data) {
    const client = new MongoClient(process.env.CONNECTION_STRING);
    try {
        await client.connect();
        const db = client.db('movieLens');
        const collection = db.collection('movies');

        await collection.insertMany(data);
        console.log('Data successfully stored in MongoDB');
    } 
    catch (error) 
    {
        console.error('Error storing data:', error);
    } 
    finally 
    {
        await client.close();
    }
}

async function setUpDatabase()
{
    const client = new MongoClient(process.env.CONNECTION_STRING);
    try 
    {
        await client.connect();
        const db = client.db('movieLens');

        await db.createCollection('movies');
        console.log('Database and collection setup complete');
    } 
    catch (error) 
    {
        if (error.codeName === 'NamespaceExists') 
        {
            console.log('Collection already exists');
        } else 
        {
            throw error;
        }
    } 
    finally 
    {
        await client.close();
    }
}