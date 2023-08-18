import { useContext, useEffect, useState } from "react";
import { SideBar } from "../components/Dashboard/SideBar";
import axios, { AxiosError } from "axios";
import { AppContextData } from "../context/AppContext";
interface getOrderDetail {
  _id: string;
  productId: string;
  quantity: number;
  totalQuantity: number;
  name: string;
  price: number;
  sellerId: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerNumber: string;
  address: string;
}
export default function Orders() {
  const [data, setData] = useState<getOrderDetail[]>([]);
  const { userId } = useContext(AppContextData);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const response = await axios.get("/orders/details");
    console.log(response.data);
    console.log(userId);
    const getData = response.data.filter(
      (data: any) => data.sellerId === userId
    );
    setData(getData);
  };
  useEffect(() => {
    data.map((res: getOrderDetail) => {
      inventoryUpdated(res);
    });
  }, [data]);
  const inventoryUpdated = async (data: getOrderDetail) => {
    const id = data.productId;
    const quantity = data.totalQuantity - data.quantity;
    try {
      const response = await axios.patch(`medicine/edit/${id}`, {
        quantity,
      });
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };

  return (
    <SideBar>
      <div>
        {" "}
        <h2 className="text-4xl font-semibold text-blue-600 mb-4 flex justify-center mt-5">
          Orders
        </h2>
        {data.map((res: getOrderDetail) => {
          return res ? (
            <div className="bg-white p-6 rounded-md shadow-md  border mx-10 flex">
              <div className="w-3/6">
                <div className="flex justify-between mb-4">
                  <p className="text-gray-600">Order ID: {res._id}</p>
                  {/* <p className="text-gray-600">Date: August 11, 2023</p> */}
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Customer Information
                  </h3>
                  <p className="text-gray-600">Product Id: {res.productId}</p>
                  <p className="text-gray-600">Name: {res.buyerName}</p>
                  <p className="text-gray-600">Email: {res.buyerEmail}</p>
                  <p className="text-gray-600">Phone: {res.buyerNumber}</p>
                  <p className="text-gray-600">Address: {res.address}</p>
                </div>
              </div>

              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200 border text-left">
                      Medicines
                    </th>
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
                    <td className="py-2 px-4">{res.name}</td>
                    <td className="py-2 px-4">{res.quantity}</td>
                    <td className="py-2 px-4 text-right">${res.price}</td>
                  </tr>
                  {/* <tr className="border">
                    <td className="py-2 px-4">Product B</td>
                    <td className="py-2 px-4">1</td>
                    <td className="py-2 px-4 text-right">$30.00</td>
                  </tr> */}
                </tbody>
                <tfoot className="border ">
                  <tr className="border">
                    <td className="py-2 px-4 font-semibold">Total</td>
                    {/* <td className="py-2 px-4  font-semibold">3</td> */}
                    <td></td>
                    <td className="py-2 px-4 text-right font-semibold">
                      ${res.price * res.quantity}
                    </td>
                  </tr>
                </tfoot>
              </table>
              {/* <div className="text-center">
              <p className="text-xl font-semibold text-green-500">
                Order received and being processed. Thank you!
              </p>
            </div> */}
            </div>
          ) : (
            <>Don't have any order</>
          );
        })}
      </div>
    </SideBar>
  );
}
