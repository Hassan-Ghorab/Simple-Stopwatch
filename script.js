const minutesEl = document.getElementById("minutes");
const hoursEl = document.getElementById("hours");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

// Logic behind the scenes
let hours = localStorage.getItem("hoursNumber") || 0o0;
let minutes = localStorage.getItem("minutesNumber") || 0o0;
let seconds = localStorage.getItem("secondsNumber") || 0o0;
let ms = localStorage.getItem("msNumber") || 0o0;
let Interval;

// put a zero before the number if it's less than 9
// and show the values in the html elements
function showNumber(element, number) {
  number <= 9
    ? (element.innerHTML = `0${number}`)
    : (element.innerHTML = number);
}

// The main function that calcs the values of the watch
function startTimer() {
  // raise the ms and save it to local storage
  ms++;
  saveNumbersToLocalStorage("msNumber", ms);

  // check if the seconds more than 99 to raise the seconds
  // save the seconds to localStorage and then call it again to be on the screen
  // make the ms = 0 to start again and make another one second
  if (ms > 99) {
    seconds++;
    saveNumbersToLocalStorage("secondsNumber", seconds);
    showNumber(secondsEl, seconds);
    ms = 0;
  }
  showNumber(secondsEl, seconds);

  // same as in the (ms logic) but here you check that seconds is more than 59
  if (seconds > 59) {
    minutes++;
    saveNumbersToLocalStorage("minutesNumber", minutes);
    showNumber(minutesEl, minutes);
    seconds = 0;
    secondsEl.innerHTML = `0${0}`;
  }
  showNumber(minutesEl, minutes);

  // same as in the (seconds logic)
  // but you just need to clear the minutes number to start a new hour
  if (minutes > 59) {
    hours++;
    saveNumbersToLocalStorage("hoursNumber", hours);
    localStorage.removeItem("minutesNumber");
    showNumber(hoursEl, hours);
    minutes = 0;
    minutesEl.innerHTML = `0${0}`;
  }
  showNumber(hoursEl, hours);
}
// call the showNumbers function to get the values form localStorage to html elements
showNumber(secondsEl, seconds);
showNumber(minutesEl, minutes);
showNumber(hoursEl, hours);

// click start btn to let the watch work
// it's all about the startTimer function
// and rasing the ms
startBtn.addEventListener("click", (e) => {
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
});

// click stop btn to make the timer stop only but will keep the data
stopBtn.addEventListener("click", (e) => {
  clearInterval(Interval);
});

// click reset btn to make everything start over again
resetBtn.addEventListener("click", (e) => {
  clearInterval(Interval);
  ms = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  showNumber(secondsEl, seconds);
  showNumber(minutesEl, minutes);
  showNumber(hoursEl, hours);
  localStorage.clear();
});

// saveValues of (ms-seconds-minutes-hours) in the localStorage
function saveNumbersToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
