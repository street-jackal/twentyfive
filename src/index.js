import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import {Provider, connect} from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';

function App() {
  
    return (
      <div>
        <h1 class="input"> 25 + 5 Clock </h1>
        <div class="buttonBackground">
          <SetBreak />
          <Timer />
          <SetSession />
        </div>
      </div>
    )
}

function SetBreak() {
  const [length, setLength] = useState(5);
  return (
    <div>
      <p class="title" id="break-label">Break Length</p>
      <div class="setBackground">
        <button id="break-increment" onClick={() => setLength(length + 1)}>+</button>
        <p id="break-length">{length} minutes</p>
        <button id="break-decrement" onClick={() => setLength(length - 1)}>-</button>
      </div>
    </div>
  )
}

function SetSession() {
  const [length, setLength] = useState(25);
  return (
    <div>
      <p class="title" id="session-label">Session Length</p>
      <div class="setBackground">
        <button id="session-increment" onClick={() => setLength(length + 1)}>+</button>
        <p id="session-length">{length} minutes</p>
        <button id="session-decrement" onClick={() => setLength(length - 1)}>-</button>
      </div>
    </div>
  )
}

// convert raw seconds into MM:SS format
function formatTime(secs){
  let minutes = Math.floor(secs/60);
  let seconds = secs - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes + ':' + seconds;
}

function Timer() {
  
  //const [timeLeft, setTimeLeft] = useState(minutes);
  let seconds = 25*60;
  let timeLeft = setInterval(function(){
    if(seconds <=0){
      clearInterval(timeLeft);
      document.getElementById("time-left").innerHTML = "Finished";
    }
    else{
      document.getElementById("time-left").innerHTML = formatTime(seconds);
    }
    document.getElementById("time-left").value =  formatTime(25*60 - seconds);
    seconds -= 1;
  }, 1000);

  
  /*
  useEffect(() => {
    
  });
*/
 

  return (
    <div>
      <p class="title" id="session-label">Session Timer</p>
      <div class="timerBackground">
        <p id="time-left" class="timerDisplay">25:00</p>
        <button id="start_stop" class="sessionButton">
          <i class="fa fa-play-circle"></i>
        </button>
        <button class="sessionButton">
          <i class="fa fa-redo-alt"></i>
        </button>
      </div>
    </div>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
