import React, { useState, useEffect, useRef } from "react";
import { Paragraph } from "./Paragraph";
import { quotesArray, random, allowedKeys } from "./Quotes";
import "../App.css";

let interval = null;
var givenArr = { Paragraph };
// var strArr = givenArr.split("");

export function Display() {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [timerCount, setTimerCount] = useState(60);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [index, setIndex] = useState(0);
  // const [correctIndex, setCorrectIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [textAreaStatus, setTextAreaStatus] = useState(true);
  const [color, setColor] = useState("#aadaa9");
  const [input, setInput] = useState(""); //for entered text
  const [isWrong, setIsWrong] = useState(false);

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    // setTextAreaStatus(false);
    clearInterval(interval);
  };

  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    // setTextAreaStatus(true);
    inputRef.current.focus();
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

  // const textChangeHandler = (event) => {
  //   setInput(event.target.value);
  //   setStarted(true);
  //   var str = event.target.value.split("");
  //   setCharacterCount(event.target.value.length);
  //   // setWordCount(event.target.value.split(" ").filter(Boolean).length);
  //   let flag = 0;
  //   for (let i = 0; i < str.length; i++){
  //     if(str[i] !== strArr[i]){
  //       flag = 1;
  //       break;
  //     }
  //   }

  //   (flag === 0) ? setColor("#aadaa9") : setColor("#fcbea4");
  // };

  const textChangeHandler = (event) => {
    event.preventDefault();
    const { key } = event;
    const text = { givenArr };

    if (key === text.charAt(index)) {
      setIndex(index + 1);
      // setCorrectIndex(correctIndex + 1);
      setIsWrong(false);
      outputRef.current.innerHTML += key;
    }
    else{
      if(allowedKeys.includes(key)) {
        setIsWrong(true);
        outputRef.current.innerHTML += `<span style{{color: "red"}}>${key}</span>`
      }
    }

    const timeRemains = ((60 - timerCount) / 60).toFixed(2);
    setTypingSpeed(Math.ceil(index / 5 / timeRemains));
  };

  // const onKeyDownHandler = (event) => {
  //   setCharacterCount(event.target.value.length);
  //   setWordCount(event.target.value.split(" ").filter(Boolean).length);
  // };

  useEffect(() => {
    window.addEventListener("keydown", textChangeHandler);
    return () => {
      window.removeEventListener("keydown", textChangeHandler);
    };
  }, []);

  // const typingSpeedCounter = () => {
  //   const timeRemains = ((60 - timerCount) / 60).toFixed(2);
  //   setTypingSpeed(Math.ceil(index / 5 / timeRemains));
  // };

  const timeLimitHandler = () => {
    //when timer comes to 0
    setTextAreaStatus(false);
    setEnded();
  };

  const resetButtonHandler = () => {
    setTextAreaStatus(false);
    setEnded();
    window.location.reload();
  };

  return (
    <div class="container">
      <h2 className="heading">Fastest Fingers</h2>
      <div className="display">
        <h3 timeLimitHandler={timeLimitHandler}>
          Remaining Time: {timerCount}
        </h3>
        <h3 className="count">Total Word Count: {wordCount}</h3>
        <h3>WPM: {typingSpeed}</h3>
        <h3>Characters Typed: {index}</h3>
      </div>
      <button onClick={handleStart} style={{ cursor: "pointer" }}>
        Start Timer!
      </button>
      <button onClick={resetButtonHandler} style={{ cursor: "pointer" }}>
        Reset!
      </button>
      <div className="paragraph">
        <Paragraph />
        {/* <label>Start Typing below...</label> */}
        <textarea
          onChange={textChangeHandler}
          // onKeyUp={typingSpeedCounter}
          className="typingSpace"
          rows="7"
          cols="10"
          placeholder="type here..."
        ></textarea>
      </div>
    </div>
  );
}
