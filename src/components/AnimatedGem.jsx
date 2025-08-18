import React, { useRef, useEffect, useState } from "react";

const AnimatedGem = () => {
  const [y, setY] = useState(0);
  const direction = useRef(1);

  useEffect(() => {
    let animationId;
    const animate = () => {
      setY(prev => {
        let next = prev + direction.current * 0.8;
        if (next > 20 || next < -20) direction.current *= -1;
        return next;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <img
      src="/assets/gem.png"
      alt="Gem"
      style={{
        position: "relative",
        top: y,
        width: 32,
        height: 32,
        transition: "box-shadow 0.2s",
        boxShadow: "0 0 10px #33f"
      }}
    />
  );
};

export default AnimatedGem;