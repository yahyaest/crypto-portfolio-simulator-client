import millify from "millify";
import React from "react";

const cryptoCard = (props: any) => {
  const { coin } = props;
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

        <a href="#" className="btn btn-primary">
          Buy
        </a>
      </div>
    </div>
  );
};

export default cryptoCard;
