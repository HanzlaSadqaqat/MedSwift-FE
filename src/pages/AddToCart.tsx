import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContextData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export interface CartData {
  name: string;
  price: number;
  imageUrl: string[];
  id: string;
  quantity: number;
  newPrice: number;
  shopId: string;
}

export default function AddToCart() {
  const [data, setData] = useState<CartData[]>([]);
  const [isError, setIsError] = useState("");
  const [subQuantity, setSubQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const { userId, address } = useContext(AppContextData);
  const navigate = useNavigate();
  useEffect(() => {
    getAddToCartData();
  }, []);
  useEffect(() => {
    const quantity = data.map((res: any) => {
      return res.quantity;
    });
    const totalPrice = data.map((res: any) => {
      return res.newPrice;
    });

    setSubQuantity(
      quantity.reduce((x: number, y: number) => {
        return x + y;
      }, 0)
    );
    setSubTotal(
      totalPrice.reduce((x: number, y: number) => {
        return x + y;
      }, 0)
    );
  }, [data]);
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

    const updatedData = data.findIndex((data: any) => data.id === productId);
    console.log(updatedData);
    if (updatedData !== -1) {
      data[updatedData].newPrice = newQuantity * price;
      data[updatedData].quantity = newQuantity;
    }
    setData(data);
    localStorage.setItem("items", JSON.stringify(data));
  };
  const buyNow = async () => {
    try {
      if (!userId) {
        return navigate("/login");
      } else {
        console.log(data);
        if (!address) return navigate("/profile");
        data.map(async (res: CartData) => {
          const productId = res.id;
          const quantity = res.quantity;
          const price = res.newPrice;
          try {
            const response = await axios.post("/orders", {
              productId,
              quantity,
              customerId: userId,
              price,
            });
            return response.data;
          } catch (error) {
            const err = error as AxiosError;
            setIsError(`${err.response?.data}`);
            console.log(err.response?.data);
          }
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };
  return (
    <div>
      <div className="container mx-auto mt-8 flex flex-wrap">
        <div className="p-5 w-8/12">
          <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
          <div className=" p-4">
            <h3></h3>
            {data.map((data: CartData) => {
              return (
                <div className="gap-4 flex border-b">
                  <div className="p-4  flex w-full justify-between flex-wrap">
                    <div className="flex gap-3 items-center">
                      <img
                        src={data.imageUrl[0]}
                        className="w-16 h-16 "
                        alt=""
                      />
                      <h2 className="text-lg font-semibold flex items-center">
                        {data.name}
                      </h2>
                    </div>
                    <div className="flex gap-5 items-center mt-2">
                      <p className="text-gray-600 mb-2 flex items-center  text-xl">
                        ${data.newPrice == 0 ? data.price : data.newPrice}
                      </p>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={data.quantity}
                        className=" border rounded-sm p-2 w-20  px-4 py-2 "
                        onChange={(e) =>
                          changeItemNumber(
                            data.id,
                            parseInt(e.target.value),
                            data.price
                          )
                        }
                      ></input>
                      <button
                        className="flex items-center bg-blue-400 py-2 px-4 hover:bg-white text-white hover:text-black border border-blue-400 rounded-sm duration-300"
                        onClick={() => removeItem(data.id)}
                      >
                        {/* <FontAwesomeIcon
                          icon={faCircleXmark}
                          className=""
                          onClick={() => removeItem(data.id)}
                        /> */}
                        Remove
                      </button>
                    </div>
                  </div>
                  {isError ? (
                    <div className="text-red-600">{isError}</div>
                  ) : (
                    <></>
                  )}

                  <hr />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 p-5 w-96 relative flex flex-col text-center items-center ">
          <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
          <div className="bg-gray-100 p-4 w-full rounded-sm flex flex-col gap-3 font-normal justify-center">
            <div className="flex justify-between">
              <h3>Total Price:</h3>
              <span>${subTotal}</span>
            </div>
            <div className="flex justify-between">
              <h3>Quantity:</h3>
              <span>{subQuantity}</span>
            </div>

            <div className="flex justify-between">
              <h3>Tax:</h3>
              <span>-{0}</span>
            </div>
            <hr className="border-black mt-5" />
            <div className="flex justify-between font-bold">
              <h3 className="">Grand Total:</h3>
              <span>${subTotal}</span>
            </div>

            <div>
              <button
                className="transition-bg text-white font-bold py-2 px-4 rounded-full  w-5/6"
                onClick={() => {
                  buyNow();
                }}
              >
                Click & Buy{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
