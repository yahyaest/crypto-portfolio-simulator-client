import React from "react";

const HomePage = () => {
  return (
    <div className="container text-center top-margin">
      <h1 className="my-5">Crypto Portfolio Simulator</h1>
      <div className="my-5">
        <img
          className="img-fluid"
          src="https://www.blockleaders.io/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTg1MzE2NjU2MDcxMzg2NDQx/crypto-trading-simulator.jpg"
          alt=""
        />
      </div>
      <h5>
        Free Trading Simulator for Bitcoin and 100 cryptocurrencies to play your
        investment strategies live without the need to spend real money.
      </h5>

      <a href="/currencies" className="btn btn-primary my-5">
        Get Started
      </a>
    </div>
  );
};

export default HomePage;
