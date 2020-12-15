import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import "./index.css";

// reusable component for setting break length and session length via buttons
function SetTime(props) {
  return (
    <div>
      <p className="title" id={props.name}>
        {props.title}
      </p>
      <div className="setBackground">
        <button id={props.b1} onClick={props.onClickPlus}>+
        </button>
        <p id={props.valueName}>{props.length}</p>
        <button id={props.b2} onClick={props.onClickMinus}>-
        </button>
      </div>
    </div>
  );
}

// reusable function to convert raw seconds into MM:SS format
function formatTime(secs) {
  if (secs < 0) secs = 0;
  let minutes = Math.floor(secs / 60);
  let seconds = secs - minutes * 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes + ":" + seconds;
}

function Timer(props) {
  const defBreak = 5,
    defSession = 25;
  const [timeLeft, setTimeLeft] = useState(defSession * 60);
  const [tick, setTick] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session Timer");
  const [flag, setFlag] = useState(true);
  let workOrBreak = useRef(true);
  let isRunning = useRef(false);
  let breakLength = useRef(defBreak);
  let sessionLength = useRef(defSession);
  let myTimer;

  useEffect(() => {
    if (isRunning.current) {
      if (timeLeft > -1) {
        myTimer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      }

      if (timeLeft === 0 && flag) {
        document.getElementById("beep").play();
        workOrBreak.current = !workOrBreak.current;
        setTimerLabel(workOrBreak.current ? "Session Timer" : "Break Timer");
        clearTimeout(myTimer);
        setFlag(false);
      }

      if (timeLeft < 0 && !flag) {
        setTimeLeft(
          workOrBreak.current
            ? sessionLength.current * 60
            : breakLength.current * 60
        );
        setFlag(true);
      }
    }
  }, [timeLeft, isRunning.current, workOrBreak.current]);

  function handleStartStop() {
    if (isRunning.current) {
      isRunning.current = false;
      clearTimeout(myTimer);
      setTick(!tick);
    } else {
      isRunning.current = true;
      setTick(!tick);
    }
  }

  function handleReset() {
    if (isRunning.current) {
      isRunning.current = false;
      clearTimeout(myTimer);
    }
    setSession(defSession);
    setTimeLeft(defSession * 60);
    setBreak(defBreak);
    workOrBreak.current = true;
    setTimerLabel("Session Timer");
    setFlag(true);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setTick(!tick);
  }

  // set break length between 1-60
  function setBreak(value) {
    if (!isRunning.current) {
      breakLength.current = value > 1 ? (value > 60 ? 60 : value) : 1;
      setTick(!tick);
    }
  }

  // set session length between 1-60
  function setSession(value) {
    if (!isRunning.current) {
      sessionLength.current = value > 1 ? (value > 60 ? 60 : value) : 1;
      setTimeLeft(sessionLength.current * 60);
      setTick(!tick);
    }
  }

  return (
    <div>
      <h1 className="input"> Session / Break Timer </h1>
      <div className="buttonBackground">
        <SetTime
          name="break-label"
          length={breakLength.current}
          title="Break Length"
          valueName="break-length"
          b1="break-increment"
          b2="break-decrement"
          onClickPlus={() => setBreak(breakLength.current + 1)}
          onClickMinus={() => setBreak(breakLength.current - 1)}
        />
        <div>
          <p className="title" id="timer-label">
            {timerLabel}
          </p>
          <audio id="beep" src="https://bigsoundbank.com/UPLOAD/mp3/1628.mp3">
            {" "}
          </audio>
          <div className="timerBackground">
            <p id="time-left" className="timerDisplay">
              {formatTime(timeLeft)}
            </p>
            <button
              id="start_stop"
              className="sessionButton"
              onClick={() => handleStartStop()}
            >
              <i className="fa fa-play-circle"></i>
            </button>
            <button
              id="reset"
              className="sessionButton"
              onClick={() => handleReset()}
            >
              <i className="fa fa-redo-alt"></i>
            </button>
          </div>
        </div>
        <SetTime
          name="session-label"
          length={sessionLength.current}
          title="Session Length"
          valueName="session-length"
          b1="session-increment"
          b2="session-decrement"
          onClickPlus={() => setSession(sessionLength.current + 1)}
          onClickMinus={() => setSession(sessionLength.current - 1)}
        />
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById("root")
);
