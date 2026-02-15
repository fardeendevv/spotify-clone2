
const playBtn = document.querySelector(".play-btn");
const progressBar = document.querySelector(".progress input");
const volumeBar = document.querySelector(".player-right input");
const currentTimeEl = document.querySelector(".progress span:first-child");
const durationEl = document.querySelector(".progress span:last-child");

const audio = new Audio("./songs/1.mp3");
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.remove("fa-circle-play");
        playBtn.classList.add("fa-circle-pause");
    } else {
        audio.pause();
        playBtn.classList.remove("fa-circle-pause");
        playBtn.classList.add("fa-circle-play");
    }
});
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});
progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
});
const nextBtn = document.querySelector(".fa-forward-step");
const prevBtn = document.querySelector(".fa-backward-step");

let songs = [
    "./songs/1.mp3",
    "./songs/2.mp3",
    "./songs/3.mp3"
];

let currentSongIndex = 0;

nextBtn.addEventListener("click", () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    audio.src = songs[currentSongIndex];
    audio.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
});

prevBtn.addEventListener("click", () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    audio.src = songs[currentSongIndex];
    audio.play();
    playBtn.classList.remove("fa-circle-play");
    playBtn.classList.add("fa-circle-pause");
});
audio.addEventListener("ended", () => {
    nextBtn.click();
});
