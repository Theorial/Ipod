let currentTrackIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById("audio-player");

// Playlist
const playList = [
  {
    title: "Crash",
    artist: "Crasher",
    src: "sounds/crash.mp3",
    image: "images/crash.png",
  },
  {
    title: "Kick-bass",
    artist: "Kick-basser",
    src: "sounds/kick-bass.mp3",
    image: "images/kick.png",
  },
  {
    title: "Snare",
    artist: "Snarer",
    src: "sounds/snare.mp3",
    image: "images/snare.png",
  },
];

// Load a track
function loadTrack(index) {
  const track = playList[index];
  audioPlayer.src = track.src;
  $(".track-info h2").text(track.title);
  $(".track-info p").text(track.artist);

  const albumArt = $(".album-art");
  albumArt
    .removeClass("has-image")
    .addClass("loading")
    .html('<i class="fas fa-spinner"></i>');

  if (track.image) {
    const img = new Image();
    img.src = track.image;
    img.onload = function () {
      albumArt.removeClass("loading").addClass("has-image")
        .html(`<img src="${track.image}" alt="${track.title}">
                    <i class="fas fa-music"></i>`);
    };
    img.onerror = function () {
      albumArt.removeClass("loading").html('<i class="fas fa-music"></i>');
    };
  } else {
    albumArt.removeClass("loading").html('<i class="fas fa-music"></i>');
  }

  if (isPlaying) audioPlayer.play();
}

// Update progress bar
function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  $(".progress").css("width", progress + "%");

  // Update time display
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60)
    .toString()
    .padStart(2, "0");
  $(".current-time").text(`${currentMinutes}:${currentSeconds}`);

  const durationMinutes = Math.floor(audioPlayer.duration / 60);
  const durationSeconds = Math.floor(audioPlayer.duration % 60)
    .toString()
    .padStart(2, "0");
  $(".duration").text(`${durationMinutes}:${durationSeconds}`);
}

// Play/Pause toggle
function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause();
    $(".play-pause i").removeClass("fa-pause").addClass("fa-play");
  } else {
    audioPlayer.play();
    $(".play-pause i").removeClass("fa-play").addClass("fa-pause");
  }
  isPlaying = !isPlaying;
}

// Event listeners
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", nextTrack);

// Progress bar click to seek
$(".progress-bar").click(function (e) {
  const percent = e.offsetX / $(this).width();
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Volume control
$(".volume-slider").on("input", function () {
  audioPlayer.volume = $(this).val();
});

// Button controls
$(".play-pause").click(togglePlay);
$(".prev-btn").click(prevTrack);
$(".next-btn").click(nextTrack);
$(".shuffle-btn").click(shuffle);
$(".repeat-btn").click(toggleRepeat);

// Control functions
function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + playList.length) % playList.length;
  loadTrack(currentTrackIndex);
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playList.length;
  loadTrack(currentTrackIndex);
}

function shuffle() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * playList.length);
  } while (newIndex === currentTrackIndex && playList.length > 1);

  currentTrackIndex = newIndex;
  loadTrack(currentTrackIndex);
}

let isRepeat = false;
function toggleRepeat() {
  isRepeat = !isRepeat;
  $(".repeat-btn").toggleClass("active", isRepeat);
  audioPlayer.loop = isRepeat;
}

// Initialize player
loadTrack(currentTrackIndex);
