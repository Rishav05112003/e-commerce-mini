const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API endpoint to submit a new product
app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// API endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});