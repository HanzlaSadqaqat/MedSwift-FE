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
  return (
    <div className="">
      <div className="CARDS">
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
      </div>

      <div>{props.children}</div>
    </div>
  );
};
