import React from "react";
import { SideBar } from "../components/Dashboard/SideBar";

export default function Orders() {
  return (
    <SideBar>
      <div>
        {" "}
        <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Order Received</h2>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Order ID: 123456</p>
            <p className="text-gray-600">Date: August 11, 2023</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
            <p className="text-gray-600">Name: John Doe</p>
            <p className="text-gray-600">Email: john@example.com</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 border text-left">Item</th>
                <th className="py-2 px-4 bg-gray-200 border text-left">
                  Quantity
                </th>
                <th className="py-2 px-4 bg-gray-200 border text-right">
                  Price
                </th>
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
          <div className="text-center">
            <p className="text-xl font-semibold text-green-500">
              Order received and being processed. Thank you!
            </p>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
