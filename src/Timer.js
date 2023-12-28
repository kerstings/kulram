import { useState, useEffect } from 'react';

const Timer = ({ maxtime, onTimeUpdate }) => {
    const [milliSeconds, setMilliSeconds] = useState(0);

    const formatTime = (milliSeconds) => {
        milliSeconds = maxtime*1000-milliSeconds;
        const seconds = Math.floor(milliSeconds / 1000);
        const tenths = Math.floor((milliSeconds % 1000) / 100);
        return `${seconds}:${tenths}`;
      };
      
    useEffect(() => {
      const updateTimer = () => {
        setMilliSeconds((prevMilliSeconds) => prevMilliSeconds + 10);
      };
  
      const intervalId = setInterval(() => {
        updateTimer();
        // Call the onTimeUpdate prop with the updated milliSeconds
        if (onTimeUpdate) {
          onTimeUpdate(milliSeconds);
        }
      }, 10);
  
      return () => clearInterval(intervalId);
    }, [onTimeUpdate, milliSeconds]);
  return formatTime(milliSeconds);
};

export default Timer;
