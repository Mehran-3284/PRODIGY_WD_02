const timerDisplay = document.querySelector('.timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapTimesList = document.querySelector('.lap-times');

let startTime = 0;
let intervalId = null;
let isRunning = false;

function formatTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;
    intervalId = setInterval(updateTimer, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

function resetTimer() {
  clearInterval(intervalId);
  isRunning = false;
  startTime = 0;
  timerDisplay.textContent = '00:00:00';
  lapTimesList.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapButton.disabled = true;
}

function recordLap() {
  if (isRunning) {
    const elapsedTime = Date.now() - startTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(elapsedTime);
    lapTimesList.appendChild(lapItem);
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetTimer);