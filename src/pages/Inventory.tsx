import { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { SideBar } from "../components/Dashboard/SideBar";
import { AppContextData } from "../context/AppContext";
interface Data {
  _id: string;
  userId: object;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string[];
}

const ProductListing = () => {
  const { userId } = useContext(AppContextData);
  const [result, setResult] = useState<Data[]>([]);
  const [edit, setEdit] = useState(false);
  // let data: Data[] = [];
  useEffect(() => {
    getProducts();
  }, []);
  // useEffect(() => {
  //   data = result.filter((res: any) => {
  //     if (res.userId === userId) {
  //       return res;
  //     }
  //   });
  //   console.log("data:", data);
  // }, [result]);

  const getProducts = async () => {
    try {
      const response: any = await axios.get(`/medicine/detail`);

      setResult(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const handleEdit = async (id: any, price: number, quantity: number) => {
    setEdit(!edit);
    console.log(quantity);
    try {
      const response = await axios.patch(`medicine/edit/${id}`, {
        quantity,
        price,
      });
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };

  const handleDelete = () => {};

  return (
    <SideBar>
      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">
          Product Inventory{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <table className=" shadow-lg rounded-lg overflow-hidden p-4 flex border justify-between bg-blue-400 text-white">
            <thead className="flex w-4/5  justify-between items-center">
              <tr className="ml-10 w-28 text-center text-xl font-bold mb-2">
                Name
              </tr>
              {/* <tr className="mb-2">Description</tr> */}
              <tr className="">Quantity</tr>
              <tr className="">Price</tr>
            </thead>
          </table>
          {result.map((res: Data) => {
            // setId(res._id);
            if (res.userId === userId)
              return (
                <div
                  key={res._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex justify-between "
                >
                  <div className=" flex w-4/5  justify-between items-center">
                    {/* <tr className="text-xl font-bold mb-2">{res.name}</tr>
                    <tr className="text-gray-500 mb-2">{res.description}</tr>
                    <tr className="text-gray-600">{res.quantity}</tr>
                    <tr className="text-gray-600">${res.price}</tr> */}

                    <div className="flex items-center">
                      <img
                        src={`${res.imageUrl[0]}`}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <div className="w-28 mb-2 overflow-hidden border-gray-300 rounded text-center">
                        {res.name}
                      </div>
                    </div>
                    {/* <div className="text-gray-500 mb-2 border-gray-300 rounded text-center">
                  {res.description}
                </div> */}

                    <input
                      type="number"
                      className="text-gray-600 border border-gray-300 rounded w-12 text-center"
                      defaultValue={res.quantity}
                      onChange={(e) =>
                        (res.quantity = parseInt(e.target.value))
                      }
                    ></input>
                    <input
                      type="number"
                      className="text-gray-600 border border-gray-300 rounded w-12 text-center"
                      defaultValue={res.price}
                      onChange={(e) => {
                        res.price = parseInt(e.target.value);
                      }}
                    ></input>
                    {/* < className="text-gray-600"> */}
                  </div>
                  <div className="flex justify-end ">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      onClick={() =>
                        handleEdit(res._id, res.price, res.quantity)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </SideBar>
  );
};

export default ProductListing;
