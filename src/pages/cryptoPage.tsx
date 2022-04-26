import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CryptoCard from "../components/cryptoCard";
import UserContext from "../user-context";
import { Spinner } from "react-bootstrap";

const CryptoPage = () => {
  const [coins, setCoins] = useState<any>({});
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const userCtx = useContext(UserContext);


  const getCryptoData = async () => {
    await axios
      .get("https://api.coincap.io/v2/assets")
      .then(function (response) {
        setCoins(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await getCryptoData();
      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (isFetching) return <Spinner className="spinner" animation="border" variant="danger" />;

  return (
    <div>
      <h1 className="text-center my-4"> Top 100 Crypto Currencies</h1>
      <div className="cards">
        {coins?.map((coin: any,index:number) => (
          <CryptoCard key={index} coin={coin}></CryptoCard>
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;
