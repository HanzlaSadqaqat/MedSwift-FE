import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/homepage/Navbar";
import { AppContextData } from "../context/AppContext";
interface productDetail {
  name: string;
  description: string;
  weight: string;
  imageUrl: string[];
  price: number;
  quantity: number;
  _id: string;
}
interface getData {
  name: string;
  price: number;
  imageUrl: string[];
  id: string;
  newPrice: number;
}
export default function ProductDetailPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemLength, setItemLength] = useState(0);
  const [newPrice, setNewPrice] = useState(null);
  const { email } = useContext(AppContextData);
  const [image, setImage] = useState("");
  const [product, setProduct] = useState<productDetail | null>(null);
  const [items, setItems] = useState(() => {
    const storeItems = localStorage.getItem("items");

    return storeItems ? JSON.parse(storeItems) : [];
  });
  const navigate = useNavigate();
  // name: "",
  // description: "",
  // weight: "",
  // imageUrl: [""],
  // price: 0,
  // quantity: 0,
  // _id: "",
  useEffect(() => {
    const result = localStorage.getItem("product");
    if (result) {
      const data: productDetail[] = JSON.parse(result);
      setProduct(data[0]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    const data = localStorage.getItem("items");
    if (data) {
      const result = JSON.parse(data);
      const quantity = result.map((res: any) => {
        return res.quantity;
      });
      setItemLength(
        quantity.reduce((x: number, y: number) => {
          return x + y;
        }, 0)
      );
      const price = result.map((res: any) => {
        return res.price;
      });
      setTotalPrice(
        price.reduce((x: number, y: number) => {
          return x + y;
        }, 0)
      );
      const newPriceList = result.map((res: any) => {
        return res.newPrice;
      });
      setNewPrice(
        newPriceList.reduce((x: number, y: number) => {
          return x + y;
        }, 0)
      );
    }
  }, [items]);
  const addToCart = (
    id: string,
    name: string,
    price: number,
    imageUrl: string[]
  ) => {
    const quantity = 1;
    const data = localStorage.getItem("items");
    if (data) {
      const getData = JSON.parse(data);
      console.log("GET DATA:", getData);
      const index = getData.findIndex((res: getData) => {
        return res.id === id;
      });

      console.log(index);
      if (index != -1) {
        getData[index].quantity = getData[index].quantity + 1;
        console.log(getData);
        getData[index].newPrice = price * getData[index].quantity;
        setItems(getData);
        navigate("/addtocart");
      } else {
        const newItem = {
          name: name,
          price: price,
          imageUrl: imageUrl,
          id: id,
          quantity: quantity,
          newPrice: price * quantity,
        };
        console.log("newItem:", newItem);
        console.log("data:", items);
        const updateItems = [...items, newItem];
        console.log("updateItem:", updateItems);
        setItems(updateItems);
      }
    }
  };
  return (
    <div>
      <Navbar
        email={email}
        price={totalPrice}
        itemNumber={itemLength}
        newPrice={newPrice}
      >
        <div className="container mx-auto px-4 py-8 mt-16">
          {product ? (
            <div className="flex justify-center h-screen flex-wrap gap-10">
              <div className="w-full md:w-1/2 lg:w-1/3 h-full">
                <div className="border  h-3/4 overflow-hidden flex justify-center">
                  <img
                    src={image ? image : product.imageUrl[0]}
                    alt="Product Image"
                    className="w-full h-full mb-4 p-5 hover:border hover:scale-125"
                  />
                </div>
                <div className="flex gap-3 ml-5 mt-5 ">
                  {product.imageUrl.map((image) => {
                    return (
                      <img
                        src={image}
                        alt="Product Image 2"
                        onClick={() => setImage(image)}
                        className=" h-24 hover:border border-black hover:scale-110 shadow-md"
                      />
                    );
                  })}
                </div>
              </div>

              <div className="w-full md:w-1/2 px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                <p className="text-red-600 text-xl mb-4">
                  Price: ${product.price}
                </p>
                <p className="text-gray-700 text-lg h-3/6 overflow-y-scroll">
                  <h4 className="font-medium">Description:</h4>{" "}
                  {product.description}
                </p>
                <span className="relative  flex gap-3 mt-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(
                        product._id,
                        product.name,
                        product.price,
                        product.imageUrl
                      );
                    }}
                    className={`transition-bg border z-0 before:content-[''] hover:text-white border-blue-300 hover:border-blue px-4  w-full rounded-full flex justify-center py-2 bg-blue-400 hover:bg-blue-500 transition duration-200 text-white font-bold gap-2 items-center hover:-tracking-tighter`}
                  >
                    <div className="relative flex justify-center items-center gap-2 ">
                      <FontAwesomeIcon icon={faCartShopping} />

                      <h3>Add to cart</h3>
                    </div>
                  </button>
                  <button className="hover:scale-110 duration-300">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="border-gray-400 border p-3 w-5 h-5 rounded-full hover:bg-gray-600 hover:text-white "
                    />
                  </button>
                </span>
              </div>
            </div>
          ) : (
            <h1 className="flex justify-center text-3xl">
              404 Error: Page Not Found
            </h1>
          )}
        </div>
      </Navbar>
    </div>
  );
}
