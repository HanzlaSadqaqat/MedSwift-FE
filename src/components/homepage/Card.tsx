// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { AppContextData } from "../../context/AppContext";
// import Rating from "./Rating";
interface cardProp {
  children: React.ReactNode;
  imageUrl: string[];
  name: string;
  price: number;
  id: string;
}

export const Card: React.FC<cardProp> = (props: cardProp) => {
  // const [items, setItems] = useState(() => {
  //   const storeItems = localStorage.getItem("items");
  //   return storeItems ? JSON.parse(storeItems) : [];
  // });
  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);
  // const addToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const newItem = {
  //     name: props.name,
  //     price: props.price,
  //     imageUrl: props.imageUrl,
  //     id: props.id,
  //   };
  //   const updateItems = [...items, newItem];
  //   setItems(updateItems);
  //   // localStorage.setItem("items", JSON.stringify(updateItems));

  //   console.log(updateItems);
  // };

  return (
    <div className="">
      <div className="CARDS">
        {/* <Link
          to="/product/details"
          className="border  p-4 flex flex-col gap-2 shadow-sm rounded hover:shadow-xl m-2"
        > */}
        <div className=" flex justify-center ">
          <img
            src={`${props.imageUrl[0]}`}
            className="w-60 h-60 rounded"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="Medicine_Name font-bold text-xl">{props.name}</div>
          <div className="Rating_stars "></div>
          <div className=" text-3xl">{props.price}$</div>
        </div>
        {/* <div className="flex gap-3 justify-center">
            <button
              onClick={addToCart}
              className="px-4 w-5/6 flex justify-center py-2 bg-blue-400 rounded hover:bg-blue-500 transition duration-200 text-white font-bold gap-2 items-center"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Add
            </button>
          </div> */}
        {/* </Link> */}
      </div>

      <div>{props.children}</div>
    </div>
  );
};
