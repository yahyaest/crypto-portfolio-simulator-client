import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import UserContext from "../user-context";

const DashboardPage = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState<any>({});
  const [portfolioTransactions, setPortfolioTransactions] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const userCtx = useContext(UserContext);

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
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

    if (portfolioTransactions.length === 0)
      return (
        <Spinner className="spinner" animation="border" variant="danger" />
      );


  return (
    <div>
      <h1 className="text-center my-2">
        {(userCtx.user as any).username} DashboardPage
      </h1>
      <button onClick={getSharesCurrentPrices} className="btn btn-primary m-2">
        Get Current Prices
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Crypto</th>
            <th>Shares</th>
            <th>Bought At</th>
            <th>Current Price</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {portfolioTransactions.map((transaction: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction.cryptoName}</td>
              <td>{transaction.cryptoShares}</td>
              <td>{transaction.cryptoPrice.toString().slice(0, 7)}</td>
              <td>{currentPrice[index]}</td>
              <td>
                <button
                  onClick={() =>
                    sellCryptoShares(transaction, currentPrice[index])
                  }
                  className="btn btn-primary btn-sm"
                  disabled={isDisabled}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardPage;
