import multiparty from 'multiparty';
import path from 'path';
import clientPromise from '../../lib/mongodb';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new multiparty.Form({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      maxFilesSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error uploading files', details: err.message });
      }

      try {
        console.log('Parsed fields:', fields);
        console.log('Parsed files:', files);

        const client = await clientPromise;
        const db = client.db('GMC-ecommerce');

        // Convert images to base64
        const imageBase64 = await Promise.all(
          Object.values(files).flat().map(async (file) => {
            const data = await fs.readFile(file.path);
            const base64 = data.toString('base64');
            await fs.unlink(file.path); // Delete the file after converting
            return `data:${file.headers['content-type']};base64,${base64}`;
          })
        );
        console.log('Image Base64 strings created');

        // Parse color field
        let colors;
        try {
          colors = JSON.parse(fields.color[0]);
        } catch (error) {
          console.error('Error parsing color field:', error);
          colors = fields.color[0].split(',').map(color => color.trim());
        }

        // Parse size field
        let sizes;
        try {
          sizes = JSON.parse(fields.size[0]);
        } catch (error) {
          console.error('Error parsing size field:', error);
          sizes = fields.size[0].split(',').map(size => size.trim());
        }

        // Create product object
        const product = {
          name: fields.name?.[0],
          brand: fields.brand?.[0],
          description: fields.description?.[0],
          price: fields.price?.[0] ? parseFloat(fields.price[0]) : null,
          category: fields.category?.[0],
          color: colors,
          size: sizes,
          inStock: fields.inStock?.[0] === 'true',
          images: imageBase64,
          createdAt: new Date(),
        };

        // Validate required fields
        const requiredFields = ['name', 'description', 'price', 'category', 'images'];
        for (const field of requiredFields) {
          if (!product[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
          }
        }

        console.log('Product object:', product);

        // Insert product into the database
        const result = await db.collection('products').insertOne(product);
        console.log('Insert result:', result);

        res.status(201).json({ message: 'Product added successfully', productId: result.insertedId });
      } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ error: 'An error occurred while adding the product', details: error.message, stack: error.stack });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}