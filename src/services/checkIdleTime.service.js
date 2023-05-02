import { useState, useEffect } from 'react';

function CheckIdleTime() {
  const [timeIdle, setTimeIdle] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        console.log(timeIdle);
        setTimeIdle(timeIdle + 1);
        if (timeIdle >= 25) {
          window.location.href = "http://localhost:9090/access-smkc/";
        }
      }, 1000)
    );

    return () => {

      clearInterval(intervalId);
      // eslint-disable-next-line
    };

  }, [timeIdle]);

  useEffect(() => {
    const handleClick = () => {
      setTimeIdle(0);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

export default CheckIdleTime;