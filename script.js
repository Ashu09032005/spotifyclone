console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio("1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItem=Array.from(document.getElementsByClassName("songItem"));
let songs=[
    {songName:"Cialo", filePath:"1.mp3",coverPath: "1.jpg"},
    {songName:"Mario", filePath:"2.mp3",coverPath: "2.jpg"},
    {songName:"Rabba", filePath:"3.mp3",coverPath: "3.jpg"},
    {songName:"Bhula dena", filePath:"4.mp3",coverPath: "4.jpg"},
    {songName:"Remix", filePath:"5.mp3",coverPath: "5.jpg"},
    {songName:"Mix", filePath:"6.mp3",coverPath: "6.jpg"},
    {songName:"pop", filePath:"7.mp3",coverPath: "7.jpg"},
    {songName:"Chello", filePath:"8.mp3",coverPath: "8.jpg"},
    {songName:"Chio", filePath:"9.mp3",coverPath: "9.jpg"},
    {songName:"na jaana", filePath:"10.mp3",coverPath: "10.jpg"},
]
songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Use coverPath, not filePath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Optional: Set song name
})
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-solid", "fa-play");
        masterPlay.classList.add("fa-solid", "fa-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-solid", "fa-pause");
        masterPlay.classList.add("fa-solid", "fa-play");
        gif.style.opacity=0;
    }
})
audioElement.addEventListener("timeupdate", () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause"); // Remove pause icon
        element.classList.add("fa-play");    // Add play icon
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.id = index; // Assign correct id based on index
    element.addEventListener("click", (e) => {
        makeAllPlays(); // Reset all buttons to 'play' state
        songIndex = index; // Update songIndex based on button clicked
        masterSongName.innerText=songs[songIndex].songName;
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        
        audioElement.src = songs[songIndex].filePath; // Update source to correct song
        audioElement.currentTime = 0;
        audioElement.play();
        
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    });
});

document.getElementById("next").addEventListener("click", () => {
    makeAllPlays(); // Reset all play icons
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    // Update play icon for the current song
    document.getElementById(songIndex).classList.remove("fa-play");
    document.getElementById(songIndex).classList.add("fa-pause");

    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});
document.getElementById("previous").addEventListener("click", () => {
    makeAllPlays(); // Reset all play icons
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play icon for the current song
    document.getElementById(songIndex).classList.remove("fa-play");
    document.getElementById(songIndex).classList.add("fa-pause");
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
});


