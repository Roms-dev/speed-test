const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const status = document.getElementById('status');
const result = document.getElementById('result');

let downloadSize = 20 * 1024 * 1024; // 20 MB
let downloadTime, downloadSpeed;

startBtn.addEventListener('click', startTest);
stopBtn.addEventListener('click', stopTest);

function startTest() {
  status.innerText = 'Downloading...';
  result.innerText = '';
  downloadTime = performance.now();
  downloadFile(downloadSize, calculateSpeed);
}

function stopTest() {
  downloadSize = 0;
  status.innerText = 'Test stopped.';
  result.innerText = '';
}

function downloadFile(size, callback) {
  const url = 'https://www.example.com/testfile.bin';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onprogress = function(e) {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      status.innerText = `Downloading... ${percent}%`;
    }
  };
  xhr.onload = function() {
    callback(size, downloadTime, performance.now());
  };
  xhr.send();
}

function calculateSpeed(size, startTime, endTime) {
  const timeInSeconds = (endTime - startTime) / 1000;
  const speedInBitsPerSecond = (size * 8) / timeInSeconds;
  const speedInMegabitsPerSecond = speedInBitsPerSecond / 1000000;
  downloadSpeed = Math.round(speedInMegabitsPerSecond);
  status.innerText = `Download speed: ${downloadSpeed} Mbps`;
  result.innerText = `Downloaded ${size / 1024 / 1024} MB in ${timeInSeconds} seconds.`;
}