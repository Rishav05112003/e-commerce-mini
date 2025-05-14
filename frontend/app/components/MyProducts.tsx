'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
}

const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts(searchTerm);
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterProducts = (search: string) => {
    if (!search) {
      setFilteredProducts(products);
      return;
    }

    const keywords = search.toLowerCase().split(/\s+/).filter(Boolean); // Split by spaces and remove empty strings

    const results = products.filter(product => {
      const nameLower = product.name.toLowerCase();
      const descriptionLower = product.description ? product.description.toLowerCase() : '';

      return keywords.every(keyword => nameLower.includes(keyword) || descriptionLower.includes(keyword));
    });

    setFilteredProducts(results);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl text-gray-700 font-semibold mb-4">My Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border-2 shadow-md rounded-md p-4">
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-52 object-cover rounded-md mb-2" />}
            <h3 className="text-lg text-gray-500 font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-1">Price: ${product.price}</p>
            <p className="text-gray-700">{product.description}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && searchTerm && <p>No products found matching your search.</p>}
      </div>
    </div>
  );
};

export default MyProducts;