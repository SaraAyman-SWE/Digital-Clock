"use strict";

//////////////////////////////////////////////////////////////////////
// Create Digital watch like the following with alarm option ( you can use alert dialog
//    box to alarm the user instead of sound)
//////////////////////////////////////////////////////////////////////

// console.log();
const containerApp = document.querySelector("body");
const dateParent = document.querySelector(".testimonial-section2");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelector(".show-modal");
const btnSetAlarm = document.querySelector(".btn-set");
const btnClearAlarm = document.querySelector(".btn-clear");
const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

var clock = formatAMPM();
var today = new Date();
addClock(clock);
updateDay(today);
setInterval(updateClock, 1000);

// CLOCK FUNCTIONS
function formatAMPM() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = String(date.getMinutes()).padStart(2, 0);
  var seconds = String(date.getSeconds()).padStart(2, 0);
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0'+ minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

function addClock(hrsMin) {
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(hrsMin);
  // // Adding the text node to the newly created div
  newDiv.appendChild(newContent);
  // // Adding the newly created element and its content into the DOM
  dateParent.appendChild(newDiv);
  newDiv.classList.add("clock");
  newDiv.style.fontSize = "4rem";
  newDiv.style.textAlign = "center";
}

function updateClock() {
  var clock = document.getElementsByClassName("clock")[0];
  clock.innerHTML = formatAMPM();
}

function updateDay(day) {
  document
    .getElementsByClassName(`day${day.getDate()}`)[0]
    .classList.add("current-day");
}

//////////////// MODAL ////////////////////

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////SET CLEAR BUTTONS//////////////////
let timer;
const setAlarm = function () {
  // Timer
  if (timer) clearInterval(timer);
  timer = startAlarmTimer();
};
const clearAlarm = function () {
  // Timer
  if (timer) clearInterval(timer);
  inputHours.value = "";
  inputMinutes.value = "";
  inputSeconds.value = "";
};
const startAlarmTimer = function () {
  const tick = function () {
    const hr = String(Math.trunc(time / (60 * 60))).padStart(2, 0);
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    inputHours.value = hr;
    inputMinutes.value = min;
    inputSeconds.value = sec;
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      inputHours.value = "";
      inputMinutes.value = "";
      inputSeconds.value = "";
      alert("ALARM!!");
    }
    // Decrease 1 second
    time--;
    console.log(time);
  };
  // Set time to 10 minutes
  // let time = 600;
  let time =
    Number(inputHours.value) * 60 * 60 +
    Number(inputMinutes.value) * 60 +
    Number(inputSeconds.value);
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
btnSetAlarm.addEventListener("click", setAlarm);
btnClearAlarm.addEventListener("click", clearAlarm);
