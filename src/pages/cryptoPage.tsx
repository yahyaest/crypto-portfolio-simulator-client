import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoCard from "../components/cryptoCard";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CryptoPage = () => {
  const [coins, setCoins] = useState<any>({});
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const history = useHistory();

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

  if (!localStorage.getItem("email")) history.push("/login");

  if (isFetching)
    return <Spinner className="spinner" animation="border" variant="danger" />;

  return (
    <div>
      <h1 className="text-center my-4"> Top 100 Crypto Currencies</h1>
      <div className="cards">
        {coins?.map((coin: any, index: number) => (
          <CryptoCard key={index} coin={coin}></CryptoCard>
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;
