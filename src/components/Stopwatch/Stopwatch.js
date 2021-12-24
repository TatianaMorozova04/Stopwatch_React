import './Stopwatch.css';
import { useState } from "react";

const initialTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

let countClick = 0;

export function Stopwatch() {
  const [time, setTime] = useState(initialTime);
  const [intervalId, setIntervalId] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const start = startTime => {
    const updatedTime = { ...startTime };

    const id = setInterval(() => {
      updatedTime.seconds++;

      if (updatedTime.seconds > 59) {
        updatedTime.seconds = 0;
        updatedTime.minutes +=1;
      }

      if (updatedTime.minutes > 59) {
        updatedTime.minutes = 0;
        updatedTime.hours +=1;
      }

      if (updatedTime.hours > 23) {
        updatedTime.seconds = 0;
        updatedTime.minutes = 0;
        updatedTime.hours = 0;
      }

      setTime({...updatedTime});
    }, 1000);

    if (isWaiting) {
      setIsWaiting(false);
    }

    setIntervalId(id);
    return id;
  }

  const stop = () => {
    if (isWaiting) {
      setIsWaiting(false);
    }

    if (typeof intervalId === 'number') {
      clearInterval(intervalId);
      setIntervalId(null);
      setTime({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    }
  }

  const wait = () => {
    countClick++

    if (countClick === 1) {
      setTimeout(() => countClick = 0, 301);
    }

    if (countClick === 2) {
      if (typeof intervalId === 'number') {
        countClick = 0;
        setIsWaiting(true);
        return clearInterval(intervalId);
      }
    }
  }

  const reset = () => {
    stop();
    start(initialTime);
  }

  const formatTime = value => value < 10  ? "0" + value : value;
  const triggerStart = () => start(isWaiting ? time : initialTime)

  const { seconds, minutes, hours } = time;

  return (
    <div className="Stopwatch">
      <h1>Stopwatch</h1>
      <p className="Stopwatch__time">
        {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
      </p>
      <div className="Stopwatch__buttons">
        <button
          type="button"
          onClick={triggerStart}
          className="Stopwatch__button"
          disabled={intervalId && !isWaiting}
        >
          Start
        </button>
        <button
          type="button"
          onClick={stop}
          className="Stopwatch__button"
        >
          Stop
        </button>
        <button
          type="button"
          onClick={wait}
          className="Stopwatch__button"
        >
          Wait
        </button>
        <button
          type="button"
          onClick={reset}
          className="Stopwatch__button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
