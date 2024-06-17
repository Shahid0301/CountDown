import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [remainingTime, setRemainingTime] = useState(7200);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const totalSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
    setRemainingTime(totalSeconds);
  }, [time]);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      const timeoutId = setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (remainingTime <= 0) {
      setIsRunning(false);
    }
  }, [isRunning, remainingTime]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleStart = () => {
    if (remainingTime > 0) setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value, 10) || 0),
    }));
  };
  const handleClear = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div className="countdown-timer">
      <div className="time-display">{formatTime(remainingTime)}</div>
      <div className="controls">
        {["hours", "minutes", "seconds"].map((unit) => (
          <label key={unit}>
            {unit.charAt(0).toUpperCase() + unit.slice(1)}:
            <input
              type="number"
              name={unit}
              value={time[unit]}
              onChange={handleChange}
            />
          </label>
        ))}

        <div className="buttons-section">
          <button
            className={isRunning ? "Button-pause" : "Button-start"}
            onClick={isRunning ? handleStop : handleStart}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="btn-clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
