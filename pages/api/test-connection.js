
import {clientPromise} from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('GMC-ecommerce'); // Replace with your database name

      // Try a simple query to ensure the connection is working
      const collections = await db.listCollections().toArray();

      res.status(200).json({ message: 'Database connection successful', collections });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
