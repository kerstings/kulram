import React from 'react';

const KulramFrame = () => {
  const rodPositions = [12, 20, 28, 36, 44, 52, 60, 68, 76, 84];

  return (
    <div>
      <div className="horizontal-kulram horizontal-kulram-top" />        
      <div className="horizontal-kulram horizontal-kulram-bottom" />   
      <div className="vertical-kulram-left" />
      <div className="vertical-kulram-right" /> 
      {rodPositions.map((top, index) => (
        <div  
          key={index}
          className="rod-kulram"
          style={{
            top: `${top}vh`,zIndex:-1,        
          }}
        />
      ))}
    </div>
  );
};

export default KulramFrame;
