
export default function OrderReceipt() {
  return (
    <div>
      <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Order Receipt</h2>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Order ID: 123456</p>
          <p className="text-gray-600">Date: August 11, 2023</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border text-left">Item</th>
              <th className="py-2 px-4 bg-gray-200 border text-left">
                Quantity
              </th>
              <th className="py-2 px-4 bg-gray-200 border text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="py-2 px-4">Product A</td>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4 text-right">$50.00</td>
            </tr>
            <tr className="border">
              <td className="py-2 px-4">Product B</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4 text-right">$30.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="py-2 px-4 text-right font-semibold">Total</td>
              <td className="py-2 px-4 text-right font-semibold">$80.00</td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-6 text-right">
          <p className="text-sm text-gray-600">Thank you for your order!</p>
        </div>
      </div>{" "}
    </div>
  );
}
