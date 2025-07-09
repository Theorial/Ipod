var player = new Audio("sounds/crash.mp3");
player.play();

const playList = [
  { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
  { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
  { title: "Song 3", artist: "Artist 3", src: "song3.mp3" },
];

var randomNumber = Math.floor(Math.random() * playList.length) + 1;
console.log(randomNumber);

$(".shuffle-btn").click(function () {});
$(".prev - btn").click(function () {});
$(".play-pause").click(function () {});
$(".next-btn").click(function () {});
$(".repeat-btn").click(function () {});
