import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import TransactionsTable from "../components/transactionsTable";
import UserContext from "../user-context";

const DashboardPage = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState<any>({});
  const [portfolioTransactions, setPortfolioTransactions] = useState<any>([]);
  const [currentPrice, setCurrentPrice] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const userCtx = useContext(UserContext);
  const history = useHistory();

  const reduceNemberLength = (number: number) => {
    return number.toString().slice(0, 7);
  };

  const getCurrentSharePrice = (oldPrice: number) => {
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (plusOrMinus === -1)
      return reduceNemberLength(oldPrice - (oldPrice * randomNumber) / 100);

    return reduceNemberLength(oldPrice + (oldPrice * randomNumber) / 100);
  };

  useEffect(() => {
    async function fetchPortfolioTransactions() {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/transactions/portfolio-transactions`,
          { portfolioId: (userCtx.portfolio as any)._id }
        );
        const transactions: [] = response.data;
        const boughtTansactions = transactions.filter(
          (transaction: any) =>
            transaction.transactionType === "Buy" &&
            transaction.transactionState === "Open"
        );
        setPortfolioTransactions(boughtTansactions);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    setCurrentPortfolio(userCtx.portfolio as any);

    fetchPortfolioTransactions();
  }, [userCtx]);

  const getSharesCurrentPrices = () => {
    let priceArray = [...currentPrice];

    portfolioTransactions.map((transaction: any) => {
      const currentShareValue = getCurrentSharePrice(transaction.cryptoPrice);
      priceArray.push(+currentShareValue);
    });
    setCurrentPrice(priceArray);
    setIsDisabled(false);
  };

  const sellCryptoShares = async (
    transaction: any,
    currentCryptoPrice: number
  ) => {
    try {
      // Add Sell Transaction
      const sellTransaction = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions`,
        {
          portfolioId: currentPortfolio._id,
          transactionType: "Sell",
          transactionState: "Closed",
          cryptoName: transaction.cryptoName,
          cryptoPrice: currentCryptoPrice,
          cryptoShares: transaction.cryptoShares,
          transactionValue: currentCryptoPrice * transaction.cryptoShares,
        }
      );

      // Update selled transaction state to "Closed"
      const transactionId = transaction._id;
      const updateTransaction = await axios.patch(
        `${process.env.REACT_APP_API_URL}/transactions/${transactionId}`,
        { transactionState: "Closed" }
      );

      //  Update portfolio value
      const updatePortfolio = await axios.patch(
        `${process.env.REACT_APP_API_URL}/portfolios/${currentPortfolio._id}`,
        {
          currentValue:
            currentPortfolio.currentValue +
            sellTransaction.data.transactionValue,
        }
      );
      toast.success("Crypto shares are selled successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  if (!localStorage.getItem("email")) history.push("/login");

  if (portfolioTransactions.length === 0)
    return (
      <div className=" top-margin">
        <h1 className=" top-margin text-center my-5">
          No Transaction are made yet
        </h1>
      </div>
    );

  return (
    <div className="top-margin mx-2">
      <h1 className="text-center my-5">
        {(userCtx.user as any).username} DashboardPage
      </h1>
      <div className="portfolio-info text-center my-5">
        <p>
          <strong>Intial Portfolio Value</strong> :
          {currentPortfolio.intialValue} $
        </p>
        <p>
          <strong>Current Portfolio Value</strong> :
          {currentPortfolio.currentValue.toString().slice(0, 10)} $
        </p>
      </div>
      <h4>List of not selled shares</h4>
      <button onClick={getSharesCurrentPrices} className="btn btn-primary m-3">
        Get Current Prices
      </button>

      <TransactionsTable
        portfolioTransactions={portfolioTransactions}
        currentPrice={currentPrice}
        sellCryptoShares={sellCryptoShares}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default DashboardPage;
