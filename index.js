var playList = [];
var player = new Audio("sounds/crash.mp3");
player.play();

var randomNumber = Math.floor(Math.random() * playList.length) + 1;
