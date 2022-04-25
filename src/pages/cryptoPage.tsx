import React, { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";
import CryptoCard from "../components/cryptoCard";

const CryptoPage = () => {
  const [coins, setCoins] = useState<any>({});
  const [isFetching, setIsFetching] = useState<boolean>(true);

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

  if (isFetching) return <p>Loading...</p>;

  console.log(coins);
  return (
    <div>
      CryptoPage
      <div className="cards">
        {coins?.map((coin: any) => (
          <CryptoCard coin={coin}></CryptoCard>
        ))}
      </div>
    </div>
  );
};

export default CryptoPage;
