import {
  faCapsules,
  faDollar,
  faFile,
  faInstitution,
  faPlusMinus,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideBar } from "../components/Dashboard/SideBar";
import { useNavigate } from "react-router-dom";

export const Medicine = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [expireDate, setExpireDate] = useState(new Date());
  const [availability, setAvailability] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [doseInstruction, setDoseInstruction] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<FileList | null>(null);

  const navigate = useNavigate();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setImage(e.target.files);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (image) {
        const formData = new FormData();

        for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i]);
        }

        formData.append("name", name);
        formData.append("weight", weight);
        formData.append("expireDate", expireDate.toISOString());
        formData.append("availability", availability.toString());
        formData.append("price", price.toString());
        formData.append("quantity", quantity.toString());
        formData.append("dosageInstructions", doseInstruction);
        formData.append("description", description);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        console.log(image);

        await axios.post("/medicine/upload", formData, config);
      }
      navigate("/");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <SideBar>
      <div className="border flex justify-center w-full h-full items-center">
        <div className="w-9/12 h-4/5 shadow-xl rounded border flex flex-col gap-5 p-5 items-center">
          <div className="font-bold text-3xl text-blue-500">
            Medicine Listing
          </div>
          <form onSubmit={handleFormSubmit} className="gap-10 flex flex-col">
            <div className="gap-5 grid grid-flow-row grid-cols-2">
              <div className="relative flex flex-col justify-between">
                <input
                  type="text"
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl rounded"
                  placeholder="Medicine Name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <FontAwesomeIcon
                  icon={faCapsules}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <input
                  type="text"
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl rounded"
                  placeholder="Medicine Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={faWeight}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div className="relative flex flex-col justify-center">
                <div>Expire Date:</div>
                <input
                  type="date"
                  className="border-2 pl-10 w-44 right-0 absolute border-black-300 p-1  max-w-3xl text-gray-500 rounded"
                  placeholder="Expire Date"
                  onChange={(e) => setExpireDate(new Date(e.target.value))}
                  required
                />
              </div>

              <div className="flex gap-20 items-center">
                Availability
                <input
                  type="checkbox"
                  onChange={() => setAvailability(!availability)}
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <input
                  type="number"
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl rounded"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <FontAwesomeIcon
                  icon={faDollar}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <input
                  type="number"
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl rounded"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value));
                  }}
                  required
                />
                <FontAwesomeIcon
                  icon={faPlusMinus}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <textarea
                  rows={5}
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl text-gray-500 rounded"
                  placeholder="Dose Instructions"
                  value={doseInstruction}
                  onChange={(e) => {
                    setDoseInstruction(e.target.value);
                  }}
                  required
                />
                <FontAwesomeIcon
                  icon={faInstitution}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <textarea
                  rows={5}
                  className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl text-gray-500 rounded"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={faFile}
                  className="absolute left-3 top-2 text-gray-400"
                />
              </div>
              <div>
                <input
                  type="file"
                  name="medicine_images"
                  id=""
                  accept="image/*"
                  multiple
                  onChange={handleUploadImage}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-2 p-1 w-72 relative top-1 hover:bg-secondary transition duration-200 ease-out hover:ease-in hover:text-white font-bold"
              >
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </SideBar>
  );
};
