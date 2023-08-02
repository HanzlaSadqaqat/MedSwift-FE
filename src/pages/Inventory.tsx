import React, { useState } from "react";

const ProductListing = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      stock: 10,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      stock: 15,
    },
    // Add more products as needed
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleEdit = (productId: any) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = (productId: any) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
          >
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
