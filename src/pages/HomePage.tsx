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
export const HomePage: React.FC = () => {
  const [result, setResult] = useState([]);
  const { email } = useContext(AppContextData);
  const [items, setItems] = useState(() => {
    const storeItems = localStorage.getItem("items");
    return storeItems ? JSON.parse(storeItems) : [];
  });

  useEffect(() => {
    getCardData();
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

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
    const newItem = {
      name: name,
      price: price,
      imageUrl: imageUrl,
      id: id,
    };
    const updateItems = [...items, newItem];
    setItems(updateItems);
    // localStorage.setItem("items", JSON.stringify(updateItems));

    console.log(updateItems);
  };

  return (
    <div>
      <Navbar email={email}>
        <div></div>
      </Navbar>
      <div className="mt-24 mx-5  ">
        <div className="grid grid-cols-4">
          {result.map((res: sendDataProp) => {
            return (
              <Link
                to="/product/details"
                className="border  p-4 flex flex-col gap-2 shadow-sm rounded hover:shadow-xl m-2"
              >
                <Card
                  imageUrl={res.imageUrl}
                  name={res.name}
                  price={res.price}
                  id={res._id}
                >
                  <div>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(res._id, res.name, res.price, res.imageUrl);
                        }}
                        className="px-4 w-5/6 flex justify-center py-2 bg-blue-400 rounded hover:bg-blue-500 transition duration-200 text-white font-bold gap-2 items-center"
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                        Add
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
