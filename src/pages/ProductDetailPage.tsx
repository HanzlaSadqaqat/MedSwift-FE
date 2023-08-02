export default function ProductDetailPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <img
              src="product_image.jpg"
              alt="Product Image"
              className="w-full mb-4"
            />
            <div className="flex justify-between">
              <img
                src="product_image_2.jpg"
                alt="Product Image 2"
                className="w-1/4"
              />
              <img
                src="product_image_3.jpg"
                alt="Product Image 3"
                className="w-1/4"
              />
              <img
                src="product_image_4.jpg"
                alt="Product Image 4"
                className="w-1/4"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Product Name</h1>
            <p className="text-gray-600 text-xl mb-4">Price: $19.99</p>
            <p className="text-gray-700 text-lg">
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
            <button
              id="add-to-cart-btn"
              className="mt-8 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
