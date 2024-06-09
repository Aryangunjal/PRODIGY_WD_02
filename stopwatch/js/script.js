// JavaScript for the stopwatch with lap functionality
document.addEventListener('DOMContentLoaded', () => {
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let isRunning = false;
    let interval;
    const startStopBtn = document.getElementById('startStopBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const lapsList = document.getElementById('lapsList');

    // Start or stop the stopwatch
    startStopBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(interval);
            startStopBtn.textContent = 'Start';
            startStopBtn.classList.remove('stop');
            startStopBtn.classList.add('start');
        } else {
            interval = setInterval(updateStopwatch, 10);
            startStopBtn.textContent = 'Stop';
            startStopBtn.classList.remove('start');
            startStopBtn.classList.add('stop');
        }
        isRunning = !isRunning;
    });

    // Record a lap
    lapBtn.addEventListener('click', () => {
        if (isRunning) {
            const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
            const li = document.createElement('li');
            li.textContent = lapTime;
            lapsList.appendChild(li);
        }
    });

    // Reset the stopwatch
    resetBtn.addEventListener('click', () => {
        clearInterval(interval);
        isRunning = false;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
        lapsList.innerHTML = '';
    });

    // Update the stopwatch display
    function updateStopwatch() {
        milliseconds += 10;
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds += 1;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
        updateDisplay();
    }

    // Update the displayed time
    function updateDisplay() {
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
        millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
    }

    // Format time as two digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Format milliseconds as two digits
    function formatMilliseconds(time) {
        return time < 100 ? (time < 10 ? `00${time}` : `0${time}`) : time;
    }
});
