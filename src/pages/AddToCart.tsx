export default function AddToCart() {
  const name = localStorage.getItem("name");
  const price = localStorage.getItem("price");

  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Add to Cart Page</h1>

        <div className="grid grid-cols-3 gap-4 border">
          <div className="p-4 border rounded-md flex gap-28 w-screen">
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            <div>
              <p className="text-gray-600 mb-2">Price: {price}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
          <ul className="bg-gray-100 p-4 rounded">
            <li>done</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
