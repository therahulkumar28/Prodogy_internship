import React, { useState, useEffect, useRef } from 'react';

const Stopwatch: React.FC = () => {
  //states
  const [timer, setTimer] = useState<boolean>(false);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef< any>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startStopwatch = () => {
    setTimer(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 99) {
          setSecond(prevSecond => {
            if (prevSecond === 59) {
              setMinute(prevMinute => {
                if (prevMinute === 59) {
                  setHour(prevHour => prevHour + 1);
                  return 0;
                }
                return prevMinute + 1;
              });
              return 0;
            }
            return prevSecond + 1;
          });
          return 0;
        }
        return prevCount + 1;
      });
  
      if (hour === 23 && minute === 59 && second === 59 && count === 99) {
        // Reset to 00:00:00
        setHour(0);
        setMinute(0);
        setSecond(0);
        setCount(0);
      }
    }, 10);
  };
  

  const stopStopwatch = () => {
    setTimer(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setTimer(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setCount(0);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-green-900">
      <h1 className="text-center text-green-400 text-3xl font-bold"> Prodogy <br />Stop Watch</h1>
      <div id="time" className="mb-4 text-6xl text-white">
        <span className="digit">{hour < 10 ? `0${hour}` : hour}</span>
        <span className="text-sm">Hr</span>
        <span className="digit">{minute < 10 ? `0${minute}` : minute}</span>
        <span className="text-sm">Min</span>
        <span className="digit">{second < 10 ? `0${second}` : second}</span>
        <span className="text-sm">Sec</span>
        <span className="digit">{count < 10 ? `0${count}` : count}</span>
      </div>
      <div id="buttons" className="mt-10">
        <button className="w-24 px-6 py-3 mx-4 rounded-md cursor-pointer text-lg font-semibold transition duration-500 bg-green-500 hover:bg-green-600" onClick={startStopwatch}>Start</button>
        <button className="w-24 px-6 py-3 mx-4 rounded-md cursor-pointer text-lg font-semibold transition duration-500 bg-blue-500 hover:bg-blue-600" onClick={stopStopwatch}>Stop</button>
        <button className="w-24 px-6 py-3 mx-4 rounded-md cursor-pointer text-lg font-semibold transition duration-500 bg-red-500 hover:bg-red-600" onClick={resetStopwatch}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
