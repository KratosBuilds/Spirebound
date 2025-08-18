import React from "react";
import "./AnimatedCoin.css";

const AnimatedCoin = () => (
  <img
    src="/assets/coin.png"
    alt="Coin"
    className="spinning-coin"
    style={{
      width: 32,
      height: 32,
    }}
  />
);

export default AnimatedCoin;