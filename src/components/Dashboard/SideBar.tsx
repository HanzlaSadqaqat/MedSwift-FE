import {
  faAngleLeft,
  faBoxOpen,
  faBoxes,
  faDashboard,
  faDolly,
  faListAlt,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

interface sideProps {
  children: React.ReactNode;
}
export const SideBar: React.FC<sideProps> = (props: sideProps) => {
  const [open, setOpen] = useState(true);
  const toggleOptions = () => {
    setOpen(!open);
  };
  return (
    <div className="flex justify-between">
      <div className="h-screen">
        <div
          className={`relative ${
            open ? "w-80" : "w-16"
          } duration-300 bg-gradient-to-b from-blue-500 to-cyan-500 h-full`}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`absolute -right-4 top-12 py-2 px-3  bg-green-400 border rounded-full cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={toggleOptions}
          />
          <div className="">
            <div className="flex items-center gap-5 p-3">
              <img
                src="../../../public/images/secondary logo.png"
                className="w-12 bg-blue-600 rounded-lg"
                alt=""
              />
              <div
                className={`text-green-400 font-bold text-2xl ${
                  !open && "scale-0"
                } duration-200`}
              >
                <span className="text-white">MedSwift</span>
              </div>
            </div>
            <div className="LIST list-none text-white gap-3 pt-10 font-semibold text-lg p-1">
              <Link to="/dashboard">
                <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                  <FontAwesomeIcon
                    icon={faDashboard}
                    className="h-7 relative w-10 right-3"
                    onClick={() => setOpen(true)}
                  />
                  <div className={`${!open && "scale-0"}`}>Dashboard</div>
                </li>
              </Link>
              <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                <FontAwesomeIcon
                  icon={faDolly}
                  className={`h-7 relative w-10 right-4`}
                  onClick={() => setOpen(true)}
                />
                <div className={`${!open && "scale-0"}`}>Orders</div>
              </li>
              <Link to="/products">
                <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className={`h-7 relative  w-10 right-4`}
                    onClick={() => setOpen(true)}
                  />
                  <div className={`${!open && "scale-0"}`}>Products</div>
                </li>
              </Link>
              <Link to="/inventory">
                <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                  <FontAwesomeIcon
                    icon={faBoxes}
                    className={`h-7 relative w-10 right-4`}
                    onClick={() => setOpen(true)}
                  />
                  <div className={`${!open && "hidden"}`}>Inventory</div>
                </li>
              </Link>
              <Link to="/medicine">
                <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                  <FontAwesomeIcon
                    icon={faListAlt}
                    className={`h-7 relative w-10 right-4`}
                    onClick={() => setOpen(true)}
                  />
                  <div className={`${!open && "hidden"}`}>New Listing</div>
                </li>
              </Link>
              <li className="pl-7 p-2 hover:bg-opacity-40 hover:bg-white flex gap-3 items-center cursor-pointer rounded-lg">
                <FontAwesomeIcon
                  icon={faSquarePollVertical}
                  className={`h-7 relative w-10 right-4`}
                  onClick={() => setOpen(true)}
                />
                <div className={`${!open && "hidden"}`}>States</div>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen">{props.children}</div>
    </div>
  );
};
