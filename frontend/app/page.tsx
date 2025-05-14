'use client'; // This is a client component

import React, { useState } from 'react';
import MyProducts from './components/MyProducts';
import ProductSubmission from './components/ProductSubmission';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'submission' | 'products'>('submission');

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-black text-center mb-6">Mini E-Commerce Platform</h1>
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 text-gray-700 focus:outline-none ${activeTab === 'submission' ? 'bg-gray-200 border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('submission')}
            >
              Product Submission
            </button>
            <button
              className={`px-4 py-2 text-gray-700 focus:outline-none ${activeTab === 'products' ? 'bg-gray-200 border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              My Products
            </button>
          </div>
          <div className="p-4">
            {activeTab === 'submission' && <ProductSubmission />}
            {activeTab === 'products' && <MyProducts />}
          </div>
        </div>
      </div>
    </div>
  );
}