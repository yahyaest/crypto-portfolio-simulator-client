import React from "react";
import { Table } from "react-bootstrap";

const TransactionsTable = (props: any) => {
  const { portfolioTransactions, sellCryptoShares, currentPrice, isDisabled } =
    props;
  return (
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
  );
};

export default TransactionsTable;
