import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CartData {
  name: string;
  price: number;
  imageUrl: string[];
  id: string;
}
export default function AddToCart() {
  let data: CartData[] = [];
  try {
    const result = localStorage.getItem("items");
    if (result) {
      const res = JSON.parse(result);
      // setData(res);
      data = res;
    }
  } catch (error) {
    console.log(error);
  }
  const removeItem = (id: any) => {
    console.log(id);
    const findProduct = data.findIndex((index) => index.id === id);
    console.log(findProduct);
    const file = data.filter((item) => item.id !== id);
    console.log(file);
    localStorage.setItem("items", JSON.stringify(file));
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
                    <p className="text-gray-600 mb-2 flex items-center">
                      ${data.price}
                    </p>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={1}
                      className=" border rounded-md p-2 w-20  px-4 py-2 "
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
            <div>done</div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-1.5 rounded-md">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
