// pages/api/register.js
import {clientPromise} from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phone, gender, country, city, password } = req.body;

      // Validate request data
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('GMC-ecommerce'); // Use your actual database name

      // Insert user into the database
      const result = await db.collection('users').insertOne({
        firstName,
        lastName,
        email,
        phone,
        gender,
        country,
        city,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully.', userId: result.insertedId });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'An error occurred while registering the user.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
