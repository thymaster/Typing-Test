import React, { useState } from "react";
import { Paragraph } from "./Paragraph";
import "../App.css";

let interval = null;
// let input = document.querySelector('.typingSpace');  

export function Display() {
  const [timerCount, setTimerCount] = useState(10);
  const [wordCount, setWordCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);

  // const onKeyUpHandler = () => {
  //   setWordCount(wordCount + 1);
  // };

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    clearInterval(interval);
  };

  // const handleStart = () => {
  //   setStarted(true);
  //   setEnded(false);
  //   setTimer();
  // };

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

  const onClickHandler = () => {
    setTimer();
  };

  // function wordCounter(e) {
  //   let incomingText = e.value;
  //   let text = input.value.split(' ').filter(Boolean);
  //   setWordCount(text.length);
  // }

  // function characterCounter() {
  //   let characterCount = input.value.length;
  // }

  const onKeyDownHandler = () => {
    setCharacterCount(characterCount + 1);
  };

  const buttonStyle = {
    cursor: "pointer",
  };

  const typingSpeedCounter = () => {
    setTypingSpeed({characterCount} / 5);
  }

  return (
    <div class="container">
      <div className="display">
        <div>Remaining Time: {timerCount}</div>
        <div className="count">Total Word Count: {wordCount}</div>
        <div>WPM: {typingSpeed}</div>
        <div>Characters Typed: {characterCount}</div>
      </div>
      <button onClick={onClickHandler} style={buttonStyle}>
        Go!
      </button>
      <div className="paragraph">
        <Paragraph />
        <label>Start Typing below...</label>
        <textarea
          onKeyDown={onKeyDownHandler}
          onKeyUp={typingSpeedCounter}
          className="typingSpace"
          rows="2"
          cols="10"
          placeholder="type here..."
        ></textarea>
      </div>
    </div>
  );
}
