import React from "react";
import "./AnimatedPotion.css";

const AnimatedPotion = () => (
  <img
    src="/assets/potion.png"
    alt="Potion"
    className="floating-potion"
    style={{
      width: 32,
      height: 32,
    }}
  />
);

export default AnimatedPotion;