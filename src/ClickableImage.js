import React, { useRef, useState } from 'react';

const ClickableImage = ({ active }) => {
  const clickableAreaRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    const x = event.type === 'touchstart' ? event.touches[0].clientX : event.nativeEvent.offsetX;
    const y = event.type === 'touchstart' ? event.touches[0].clientY : event.nativeEvent.offsetY;  
    const pixel = getPixelColor(x, y);

    // Check if the clicked area has color
    if (pixel[3] !== 0) {
      // React to the click on the colored part of the image
      console.log('Clicked on a colored area!');
      setIsActive(!isActive);
    } else {
        console.log("clicked outside");
    }
  };

  const getPixelColor = (x, y) => {
    const canvas = document.createElement('canvas');
    canvas.width = clickableAreaRef.current.clientWidth;
    canvas.height = clickableAreaRef.current.clientHeight;

    const context = canvas.getContext('2d');
     // Convert coordinates to integers
    const intX = Math.floor(x);
    const intY = Math.floor(y);

    context.drawImage(
    clickableAreaRef.current.querySelector('img'),
    0,
    0,
    canvas.width,
    canvas.height
  );
  

  return context.getImageData(intX, intY, 1, 1).data;
};
  return (
    <div ref={clickableAreaRef} onClick={handleClick}  onTouchStart={handleClick} onMouseDown={handleClick} style={{ position: 'relative', display: 'inline-block' }}>
      <img src={isActive ? 'beadKulramActive.png' : 'beadKulram.png'} alt="bead" style={{ display: 'block', width: '7.5vh', height: '7.5vh' }} />
    </div>
  );
};

export default ClickableImage;
