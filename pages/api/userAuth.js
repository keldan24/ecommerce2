import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Await the client promise to get the MongoClient instance
      const client = await clientPromise;
      const db = client.db('GMC-ecommerce'); // Specify the database name if needed
      const { email } = req.body;

      // Query the 'users' collection
      const user = await db.collection('users').findOne({ email }, { projection: { _id: 1 } });
      console.log("user: ", user);

      // Return the user details in the response
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: 'An error occurred while fetching user.' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
