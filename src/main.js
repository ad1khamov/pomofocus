// var minutesLabel = document.getElementById("minutes");
// var secondsLabel = document.getElementById("seconds");
// var startButton = document.getElementById("start");
// var pauseButton = document.getElementById("pause");
// var totalSeconds = 1500;

// function startTimer() {
//   startButton.disabled = true;
//   pauseButton.disabled = false;
//   var timerInterval = setInterval(function() {
//     totalSeconds--;
//     minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
//     secondsLabel.innerHTML = pad(totalSeconds % 60);

//     if (totalSeconds <= 0) {
//       clearInterval(timerInterval);
//       pauseButton.disabled = true;
//     }
//   }, 1000);
// }

// function pauseTime() {
//   startButton.disabled = false;
//   pauseButton.disabled = true;
//   totalSeconds = 1500;
//   minutesLabel.innerHTML = pad(Math.floor(totalSeconds / 60));
//   secondsLabel.innerHTML = pad(totalSeconds % 60);
// }

// function pad(val) {
//   var valString = val + ":";
//   if (valString.length < 2) {
//     return "0" + valString;
//   } else {
//     return valString;
//   }
//  }
// startButton.addEventListener("click", startTimer);
// pauseButton.addEventListener("click", pauseTime);




let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});