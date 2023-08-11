import { Card } from "../components/homepage/Card";
import { Navbar } from "../components/homepage/Navbar";
import { useState, useEffect, useContext } from "react";
// import { Card } from "../components/homepage/Card";
import axios, { AxiosError } from "axios";
import { AppContextData } from "../context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
interface sendDataProp {
  imageUrl: string[];
  name: string;
  price: number;
  _id: string;
}
interface getData {
  name: string;
  price: number;
  imageUrl: string[];
  id: string;
  newPrice: number;
}
export const HomePage: React.FC = () => {
  const [result, setResult] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemLength, setItemLength] = useState(0);
  const [newPrice, setNewPrice] = useState(null);
  const { email } = useContext(AppContextData);
  const [scroll, setScroll] = useState("");
  const [items, setItems] = useState(() => {
    const storeItems = localStorage.getItem("items");
    return storeItems ? JSON.parse(storeItems) : [];
  });

  useEffect(() => {
    getCardData();
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
  window.addEventListener("scroll", () => {
    setScroll("scale-0");
  });

  const getCardData = async () => {
    try {
      const data = await axios.get(`/medicine/detail`);
      setResult(data.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };
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
      console.log(getData);
      const index = getData.findIndex((res: getData) => {
        // if (res.id === id) {
        //   return index;
        // }
        return res.id === id;
      });

      console.log(index);
      if (index != -1) {
        getData[index].quantity = getData[index].quantity + 1;
        console.log(getData);
        getData[index].newPrice = price * getData[index].quantity;
        setItems(getData);
      } else {
        const newItem = {
          name: name,
          price: price,
          imageUrl: imageUrl,
          id: id,
          quantity: quantity,
          newPrice: price * quantity,
        };
        const updateItems = [...items, newItem];
        setItems(updateItems);
      }
    }
    // const newItem = {
    //   name: name,
    //   price: price,
    //   imageUrl: imageUrl,
    //   id: id,
    //   quantity: quantity,
    //   newPrice: price * quantity,
    // };
    // const updateItems = [...items, newItem];
    // setItems(updateItems);
  };

  return (
    <div>
      <div className="relative">
        <Navbar
          email={email}
          price={totalPrice}
          itemNumber={itemLength}
          newPrice={newPrice}
        >
          <div></div>
        </Navbar>
      </div>
      <div className="mt-24 mx-5">
        <div className="grid grid-cols-4">
          {result.map((res: sendDataProp) => {
            return (
              <Link
                to="/product/details"
                className={`border  p-4 flex flex-col gap-2 shadow-lg rounded  hover:shadow-md m-2 bg-white hover:scale-0 hover:${scroll}`}
              >
                <Card
                  imageUrl={res.imageUrl}
                  name={res.name}
                  price={res.price}
                  id={res._id}
                >
                  <div className="">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(res._id, res.name, res.price, res.imageUrl);
                        }}
                        className="px-4 w-full rounded flex justify-center py-2 bg-blue-400 hover:bg-blue-500 transition duration-200 text-white font-bold gap-2 items-center"
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
