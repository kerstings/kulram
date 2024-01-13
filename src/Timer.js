import { useState, useEffect } from 'react';

const Timer = ({ maxtime, onTimeUpdate}) => {
    const [milliSeconds, setMilliSeconds] = useState(0);

    const formatTime = (milliSeconds) => {
        milliSeconds = maxtime-milliSeconds;
        const seconds = Math.floor(milliSeconds / 1000);
        const tenths = Math.floor((milliSeconds % 1000) / 100);
        return `${seconds}:${tenths}`;
      };
      
    useEffect(() => {
      const updateTimer = () => {
        setMilliSeconds((prevMilliSeconds) => prevMilliSeconds + 100);
      };
  
      const intervalId = setInterval(() => {
        if (onTimeUpdate) {
          onTimeUpdate(milliSeconds);
        }
        updateTimer();        
      }, 89);
  
      return () => clearInterval(intervalId);
    }, [onTimeUpdate, milliSeconds]);
  return formatTime(milliSeconds);
};

export default Timer;
