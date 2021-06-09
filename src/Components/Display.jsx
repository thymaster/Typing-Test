import React, { useState, useEffect } from "react";
import { Paragraph } from "./Paragraph";
import "../App.css";

let interval = null;

export function Display() {
  const [timerCount, setTimerCount] = useState(10);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    clearInterval(interval);
  };

  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    setTimer();
  };

  const setTimer = () => {
    const now = Date.now();
    const seconds = now + timerCount * 1000;
    interval = setInterval(() => {
      const secondLeft = Math.round((seconds - Date.now()) / 1000);
      setTimerCount(secondLeft);
      if (secondLeft === 0) {
        handleEnd();
      }
    }, 1000);
  };

  // useEffect(() => {
  //   setTimer();
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [timerCount, setTimerCount]);

  const onKeyDownHandler = (event) => {
    setCharacterCount(event.target.value.length);
    setWordCount(event.target.value.split(" ").filter(Boolean).length);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const typingSpeedCounter = () => {
    const timeRemains = ((60 - timerCount) / 60).toFixed(2);
    setTypingSpeed(Math.ceil(characterCount / 5 / timeRemains));
  };

  return (
    <div class="container">
      <div className="display">
        <div>Remaining Time: {timerCount}</div>
        <div className="count">Total Word Count: {wordCount}</div>
        <div>WPM: {typingSpeed}</div>
        <div>Characters Typed: {characterCount}</div>
      </div>
      <button onClick={handleStart} style={{ cursor: "pointer" }}>
        Go!
      </button>
      <div className="paragraph">
        <Paragraph />
        <label>Start Typing below...</label>
        <textarea
          onKeyDown={onKeyDownHandler}
          onKeyUp={typingSpeedCounter}
          className="typingSpace"
          rows="7"
          cols="10"
          placeholder="type here..."
        ></textarea>
      </div>
    </div>
  );
}
