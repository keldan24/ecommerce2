// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve MongoDB client across hot reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoDB client instance for every request
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
