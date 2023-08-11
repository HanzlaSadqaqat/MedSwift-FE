import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export interface CartData {
  name: string;
  price: number;
  imageUrl: string[];
  id: string;
  quantity: number;
  newPrice: number;
}
interface CardProps {
  subTotal: number;
  subQuantity: number;
}
export default function AddToCart(props: CardProps) {
  const [data, setData] = useState<CartData[]>([]);
  useEffect(() => {
    getAddToCartData();
  }, []);
  const getAddToCartData = () => {
    const getData = localStorage.getItem("items");
    if (getData) {
      const res = JSON.parse(getData);
      setData(res);
    }
  };

  const removeItem = (id: any) => {
    const file = data.filter((item) => item.id !== id);
    setData(file);
    localStorage.setItem("items", JSON.stringify(file));
  };
  const changeItemNumber = (
    productId: string,
    newQuantity: number,
    price: number
  ) => {
    const getData = localStorage.getItem("items");
    const data = getData ? JSON.parse(getData) : [];
    console.log(data);

    const updatedData = data.findIndex((data: any) => data.id === productId);
    console.log(updatedData);
    if (updatedData !== -1) {
      data[updatedData].newPrice = newQuantity * price;
      data[updatedData].quantity = newQuantity;
    }
    setData(data);
    localStorage.setItem("items", JSON.stringify(data));
  };

  return (
    <div>
      <div className="container mx-auto mt-8 flex">
        <div className="p-5 w-full">
          <h1 className="text-3xl font-semibold mb-4">Add to Cart Page</h1>
          {data.map((data: CartData) => {
            return (
              <div className="gap-4 mt-4">
                <div className="p-4 border rounded-md flex w-full justify-between bg-slate-50">
                  <div className="flex gap-3 items-center">
                    <img
                      src={data.imageUrl[0]}
                      className="w-10 h-10 rounded-full border-2"
                      alt=""
                    />
                    <h2 className="text-lg font-semibold flex items-center">
                      {data.name}
                    </h2>
                  </div>
                  <div className="flex gap-5 items-center mt-2">
                    <p className="text-gray-600 mb-2 flex items-center font-bold text-xl">
                      ${data.newPrice == 0 ? data.price : data.newPrice}
                    </p>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={data.quantity}
                      className=" border rounded-md p-2 w-20  px-4 py-2 "
                      onChange={(e) =>
                        changeItemNumber(
                          data.id,
                          parseInt(e.target.value),
                          data.price
                        )
                      }
                    ></input>
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className=""
                        onClick={() => removeItem(data.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-5 w-full flex flex-col text-center items-center">
          <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
          <div className="bg-gray-100 p-4 w-4/6 rounded">
            <div>
              <h3 className="font-bold ">Grand Total: </h3>
              <span>{props.subTotal}</span>
            </div>
            <div>
              <h3>Quantity:</h3>
            </div>
            <div>
              <h3>Total:</h3>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-1.5 rounded-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
