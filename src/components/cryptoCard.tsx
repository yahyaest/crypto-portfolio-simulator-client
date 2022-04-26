import React, { useState, useContext, useEffect } from "react";
import UserContext from "../user-context";
import millify from "millify";
import axios from "axios";
import { toast } from "react-toastify";

const CryptoCard = (props: any) => {
  const { coin } = props;
  const [shares, setShares] = useState(0);
  const [currentPortfolio, setCurrentPortfolio] = useState<any>({});
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setCurrentPortfolio(userCtx.portfolio as any);
  }, [userCtx]);

  const buyCrypto = async () => {
    if (shares < 1) return toast.warning("You need to buy at least one share!");
    if (!localStorage.getItem("email"))
      return toast.warning("You need to login!");
    if (+coin.priceUsd * shares > currentPortfolio.currentValue)
      return toast.warning(
        `Your are trying to buy ${shares} ${coin.name} with value ${
          +coin.priceUsd * shares
        } $ but you havy only ${
          currentPortfolio.currentValue
        } $ in your account`
      );

    try {
      // Add transaction
      const transaction = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          portfolioId: currentPortfolio._id,
          transactionType: "Buy",
          transactionState: "Open",
          cryptoName: coin.name,
          cryptoPrice: +coin.priceUsd,
          cryptoShares: shares,
          transactionValue: +coin.priceUsd * shares,
        }
      );
      // update portfolio transactions
      let portfolioTransactions = [...currentPortfolio.transactions];
      portfolioTransactions.push(transaction.data._id);
      const updatePortfolio = await axios.patch(
        `${process.env.REACT_APP_API_URL}/portfolios/${currentPortfolio._id}`,
        {
          transactions: portfolioTransactions,
          currentValue:
            currentPortfolio.currentValue - transaction.data.transactionValue,
        }
      );

      toast.success(
        `Purchase of ${shares} ${coin.name} with value ${
          +coin.priceUsd * shares
        } $ is done successfully`
      );
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="card card-style">
      <div className="card-body">
        <div className="card-title card-title-style">
          <h5 className="text-center">
            {coin.name} - {coin.symbol}
          </h5>
        </div>
        <p className="card-text">
          <strong>Rank</strong>: {coin.rank}
        </p>
        <p className="card-text">
          <strong>Price</strong>: {(coin.priceUsd as string).slice(0, 9)} $
        </p>
        <p className="card-text">
          <strong>Market Cap</strong>: {millify(+coin.marketCapUsd)} $
        </p>

        <div>
          <input
            className="mx-2"
            type="number"
            placeholder="number to buy"
            onChange={(e) => setShares(+e.currentTarget.value)}
          />
          <button onClick={buyCrypto} className="btn btn-primary">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
