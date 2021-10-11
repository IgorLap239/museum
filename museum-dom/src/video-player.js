const player = document.querySelector(".main-video");
const bigButton = player.querySelector(".video-start");
const video = player.querySelector(".viewer");
const toggle =player.querySelector(".toggle");
const progress = player.querySelector(".progress");
const volume = player.querySelector(".volume");
const muteButton = player.querySelector(".mute");
const fullscreenButton = player.querySelector(".fullscreen");
let volumeValueTmp = 0;
video.playbackRate = 1;
let videoRate = video.playbackRate;


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  if (this.paused) {
    toggle.style.backgroundImage = "url('./assets/svg/play_button.svg')";
    bigButton.style.display = "flex";
  } else {
    bigButton.style.display = "none";
    toggle.style.backgroundImage = "url('./assets/svg/pause_button.svg')";
  }
}

function handleRangeUpdate() {
  console.log("volume-value = ", this.value)
  video[this.name] = this.value;
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #c4c4c4 ${progress.value}%, #c4c4c4 100%)`
}

function setVolume() {
  video.volume = volume.value;
  if (volume.value == 0) {
    muteButton.style.backgroundImage = "url('./assets/svg/mute.svg')"
  } else {
    muteButton.style.backgroundImage = "url('./assets/svg/volume.svg')"
  }
}

function muteToggle() {
  if(volume.value != 0) {
    volumeValueTmp = volume.value;
    volume.value = 0;
    video.volume = volume.value;
    muteButton.style.backgroundImage = "url('./assets/svg/mute.svg')";
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume.value * 100}%, #c4c4c4 ${volume.value}%, #c4c4c4 100%)`;
  } else {
    volume.value = volumeValueTmp;
    video.volume = volume.value;
    volumeValueTmp = 0;
    muteButton.style.backgroundImage = "url('./assets/svg/volume.svg')";
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volume.value * 100}%, #c4c4c4 ${volume.value}%, #c4c4c4 100%)`;
  }
}

function setProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

function toggleFullscreen() {
  if (!fullscreenButton.classList.contains("full-on")) {
    video.classList.add("full-video");
    fullscreenButton.classList.add("full-on");
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    }
  } else {
    video.classList.remove("full-video");
    fullscreenButton.classList.remove("full-on");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
    }
  }
}

function keyControl(e) {
  e.preventDefault();
  if (e.key === " ") {
    togglePlay();
    updateButton();
  }
  if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
    toggleFullscreen();
  }
  if (e.key === "m" || e.key === "M" || e.key === "ь" || e.key === "Ь") {
    muteToggle();
  } 
  if (e.key === "Shift") {
    document.addEventListener('keydown', (e) => {
      if (e.key === "<" || e.key === "Б") {
        if (video.playbackRate > 0.25) {
          videoRate = videoRate - 0.25;
          video.playbackRate = videoRate;
          console.log("video.playbackRate = ", video.playbackRate);
        }
      }
      if (e.key === ">" || e.key === "Ю") {
        if (video.playbackRate < 2) {
          console.log("video.playbackRate = ", video.playbackRate);
          videoRate = videoRate + 0.25;
          video.playbackRate = videoRate;
          console.log("video.playbackRate = ", video.playbackRate);
        }
      }
    })
  }
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
bigButton.addEventListener('click', () => {
  updateButton();
  togglePlay();
})
video.addEventListener('timeupdate', updateProgress)
toggle.addEventListener('click', togglePlay)
volume.addEventListener('mousemove', setVolume);
volume.addEventListener('change', setVolume);
progress.addEventListener("change", setProgress);
muteButton.addEventListener("click", muteToggle);
fullscreenButton.addEventListener("click", toggleFullscreen);

document.addEventListener('keyup', keyControl)