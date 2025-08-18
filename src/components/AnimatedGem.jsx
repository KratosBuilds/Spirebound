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
    <div style={{ position: "relative", width: 60, height: 60 }}>
      <img
        src="/assets/gem.png" // Replace with your gem asset path
        alt="Gem"
        style={{
          position: "absolute",
          left: 20,
          top: 20 + y,
          width: 20,
          height: 20,
          transition: "box-shadow 0.2s",
          boxShadow: "0 0 10px 2px #33f"
        }}
      />
    </div>
  );
};

export default AnimatedGem;