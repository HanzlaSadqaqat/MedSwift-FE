import { Card } from "../components/homepage/Card";
import { Navbar } from "../components/homepage/Navbar";
import { useState, useEffect, useContext } from "react";
// import { Card } from "../components/homepage/Card";
import axios, { AxiosError } from "axios";
import { AppContextData } from "../context/AppContext";

export const HomePage: React.FC = () => {
  const [result, setResult] = useState([]);
  const { email } = useContext(AppContextData);
  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    try {
      const data = await axios.get("/medicine/detail");
      setResult(data.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar email={email}>
        <div></div>
      </Navbar>
      <div className="mt-24 mx-5  ">
        <div className="grid grid-cols-4">
          {result.map((res: any) => {
            return (
              <Card imageUrl={res.imageUrl} name={res.name} price={res.price}>
                <div></div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
