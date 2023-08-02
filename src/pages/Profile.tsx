import axios, { AxiosError } from "axios";
import { useState, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContextData } from "../context/AppContext";
export const Profile: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const { email } = useContext(AppContextData);
  const navigate = useNavigate();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement> | null) => {
    const file: File | undefined = event?.target.files?.[0];
    if (file) {
      setImage(file);
      const imageBlob = file as Blob;
      setSelectedImage(URL.createObjectURL(imageBlob));
    }
  };
  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image !== null) {
        formData.append("image", image);
      }
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      await axios.post(`auth/profile/${email}`, formData);
      navigate("/profile/detail");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={handleForm}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
              <label
                htmlFor="image-input"
                className={`block w-full h-48 cursor-pointer overflow-hidden ${
                  selectedImage
                    ? "border-dashed border-2 border-blue-500"
                    : "border border-gray-300"
                } hover:border-blue-500`}
              >
                {selectedImage ? (
                  <img
                    src={`${selectedImage}`}
                    alt="Selected Image"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Select an image</span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image-input"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <h1 id="profile-name" className="text-2xl font-semibold">
              Hanzla sadaqat{" "}
            </h1>
            <p id="profile-role" className="text-gray-600">
              MERN Stack Developer
            </p>
          </div>

          <div className="px-4 py-2">
            <p className="text-gray-700">Contact Information:</p>

            <input
              id="profile-phone"
              type="text"
              className="mt-2 px-3 py-2 block w-full bg-gray-100 text-gray-800 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Phone"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="px-4 py-2">
            <p className="text-gray-700">Postal Address</p>
            <input
              id="profile-twitter"
              type="text"
              className="mt-2 px-3 py-2 block w-full bg-gray-100 text-gray-800 border rounded focus:outline-none focus:border-blue-500"
              placeholder="House number, city, provence and etc"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};
