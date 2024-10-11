const music = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressLine = document.getElementById('progressLine');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const imageAtist = document.getElementById('imageArtist');
const titleAtist = document.getElementById('titleArtist');
const nameAtist = document.getElementById('nameArtist');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill M',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Electric 123',
    artist: 'Jacinto QEWFSD',
  },
  {
    name: 'jacinto-3',
    displayName: 'Electric 452',
    artist: 'Jacinto DS',
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// update DOM
function loadsong(song) {
  titleAtist.textContent = song.displayName;
  nameAtist.textContent = song.artist;
  music.src = `assets/${song.name}.mp3`;
  imageAtist.src = `assets/${song.name}.jpg`;
}

//Current song

let songIndex = 0;

// prev song

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadsong(songs[songIndex]);
  playSong();
}

// next song

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadsong(songs[songIndex]);
  playSong();
}

loadsong(songs[songIndex]);

// update progress bar and time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progressLine.style.width = `${progressPercent}%`;

    // calculate display duration time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// setProgressBar

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progress.addEventListener('click', setProgressBar);
