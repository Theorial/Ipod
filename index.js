let currentTrackIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById("audio-player");

// Playlist
const playList = [
  {
    title: "Hope Is the Thing With Feathers",
    artist: "Robin (Chevy)",
    src: "sounds/Robin (Chevy) - Hope Is the Thing With Feathers  Honkai_ Star Rail.mp3",
    image: "images/robin.jpg",
  },
  {
    title: "Love Story",
    artist: "Taylor Swift",
    src: "sounds/Taylor Swift - Love Story.mp3",
    image: "images/Taylor_Swift.jpg",
  },
  {
    title: "Sway to My Beat in Cosmos",
    artist: "Robin (Chevy)",
    src: "sounds/Sway to My Beat in Cosmos - Honkai_ Star Rail OST.mp3",
    image: "images/robin2.jpg",
  },
];

// Theme Toggle Functionality
$(".theme-btn").click(function () {
  $("body").toggleClass("dark-mode");

  // Save preference to localStorage
  const isDarkMode = $("body").hasClass("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Check for saved theme preference
if (localStorage.getItem("darkMode") === "true") {
  $("body").addClass("dark-mode");
}
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
// function shuffle(a) {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

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
