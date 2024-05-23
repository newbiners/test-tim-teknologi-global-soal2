/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaFlag } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import './App.css';

const App: React.FC = () => {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
const [arrTime, setArrTime] = useState<string[]>([]);
  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(updateTime, 10);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [isPaused]);

  const updateTime = () => {
    setMilliseconds((prev) => {
      if (prev === 990) {
        setSeconds((sec) => {
          if (sec === 59) {
            setMinutes((min) => {
              return min + 1;
            });
            return 0;
          }
          return sec + 1;
        });
        return 0;
      }
      return prev + 10;
    });
  };

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsPaused(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
  };

  const btnFlagHendler = () => {
    const ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    const s = seconds < 10 ? "0" + seconds : seconds;
    const m = minutes < 10 ? "0" + minutes : minutes;
    setArrTime([...arrTime, `${m}:${s}.${ms}`]);
  }

  const btnDeleteHendler = () => {
    setArrTime([]);
  }
  return (
    <main>
      <section>
      <MdDelete className='delete-icon' onClick={btnDeleteHendler}/>
        <h1>Welcome to Stopwatch</h1>
        <div className='time-container'>
          <p>{`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds}`}</p>
        </div>
        <div className="buttons-container">
          <button className={isPaused ? "start" : "pause"} onClick={handlePlayPause}>
            {isPaused ? <FaPlay /> : <FaPause />}
            <p>{isPaused ? "Start" : "Pause"}</p>
          </button>
          <button className='stop' onClick={handleStop}>
            <FaStop />
            <p>Stop</p>
          </button>
          <button className='flag' onClick={btnFlagHendler}>
            <FaFlag />
            <p>Flag</p>
          </button>
        </div>
        <div className={arrTime.length !== 0 ? "flag-container" : ''}>
          {arrTime.length !== 0 ? arrTime.map((item, index) => <p key={index} className='flag-time'>{item}</p>) : "No flags"}
        </div>
      </section>
    </main>
  );
};

export default App;
