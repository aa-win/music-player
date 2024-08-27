const playlistContainer = document.getElementsByClassName("playlistContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
    {trackId: "music/From.mp3", title: "FROM - KQ FELLAZ"},
    {trackId: "music/I Belong.mp3", title: "I BELONG - JACOB(THE BOYZ)"},
    {trackId: "music/KoKoBop.mp3", title: "KOKOBOP - EXO"},
    {trackId: "music/On A Ride.mp3", title: "ON A RIDE - RED VELVET"},
    {trackId: "music/ဖြေလွှတ်ပစ်လိုက်တဲ့ကြိုး.mp3", title: "ဖြေလွှတ်ပစ်လိုက်တဲ့ကြိုး - စိုးလွင်လွင်"},
    {trackId: "music/愛情教會我們的事.mp3", title: "愛情教會我們的事 - ERIC CHOU"},
    {trackId: "music/病.mp3", title: "病 - TREASURE"}
]

//Title
for (let i = 0; i < tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", ()=>{
    checkActiveSong();
    currentPlayingIndex = i;
    playSong();
    trackTag.classList.add("activeSong");
    });
    trackTag.classList.add("trackItem");
    const title = (i+1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playlistContainer.append(trackTag); 
}

//Duration
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata",() => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
})

// TimeUpdate
audioTag.addEventListener("timeupdate",() => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + "/" + durationText;
    currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
})

// ProgressBar
const updateCurrentProgress = (currentTime) =>{
    const currentProgressWidth = (400/duration)*currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

// Minute & Second
const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond % 60;
    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds
    return minuteText + ":" + secondText; 
}

//Play
let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click",() => {
    isPlaying = true;
    const currentTime = Math.floor(audioTag.currentTime);
    if(currentTime === 0){
        playSong();  
    }else{
        updatePlayAndPauseButton();
        audioTag.play();
    }
})

//Pause
pauseButtonTag.addEventListener("click",() => {
    isPlaying = false;
    updatePlayAndPauseButton();
    audioTag.pause();
})

//Previous
previousButtonTag.addEventListener("click",() => {
    if(currentPlayingIndex === 0){
        return;
    }
    checkActiveSong();
    isPlaying = true;
    updatePlayAndPauseButton();
    currentPlayingIndex -=1;
    playSong();
})

//Next
nextButtonTag.addEventListener("click",() => {
    if(currentPlayingIndex === tracks.length - 1){
        return;
    }
    checkActiveSong();
    isPlaying = true;
    updatePlayAndPauseButton();
    currentPlayingIndex +=1;
    playSong();
})

//Play & PauseButton Changes
const updatePlayAndPauseButton = () => {
    if(isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else{
        playButtonTag.style.display = "inline"; 
        pauseButtonTag.style.display = "none";   
    }
}

//Checking Active Song
const checkActiveSong = () => {
const tracks = playlistContainer.children;
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].classList.contains("activeSong")) {
      tracks[i].classList.remove("activeSong");
    }
  }
};

//Play Song
const playSong = () => {
    isPlaying = true;
    updatePlayAndPauseButton();
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    const track = playlistContainer.children[currentPlayingIndex];
    track.classList.add("activeSong");
}

