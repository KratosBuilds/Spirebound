import React from 'react';

const AnimatedHealthBar = ({ health }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
            <div
                style={{
                    width: `${health}%`,
                    backgroundColor: health > 50 ? '#76c7c0' : '#ff4d4d',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default AnimatedHealthBar;