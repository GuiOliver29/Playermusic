const Songname = document.getElementById('name-music');
const nameband = document.getElementById('name-band');
const Song = document.getElementById('Audio');
const cover = document.getElementById('img');
const play = document.getElementById('play');
const Next = document.getElementById('Next');
const Return = document.getElementById('return');
const like = document.getElementById('Like');
const currentprogress = document.getElementById('current-progress');
const progresscontainer = document.getElementById('progress-container');
const embaralharbutton = document.getElementById('embaralhar');

const Confia = {
    Songname : 'Confia',
    artist : 'Menos é Mais',
    file: 'Confia'
}

const Churrasquinho = {
    Songname : 'Churrasquinho',
    artist : 'Menos é Mais',
    file: 'Churrasquinho'
}

const Lapada_Dela = {
    Songname : 'Lapada Dela',
    artist : 'Menos é Mais',
    file: 'Lapada_Dela'
}

const Doi = {
    Songname : 'Dói',
    artist : 'Jorge e Matheus',
    file: 'Dói'
}

let isplaying = false;
let isShuffled = false;
const PlayList = [Confia, Churrasquinho, Lapada_Dela, Doi];
let sortedPlayList = [...PlayList];
let index = 0;

function playsong(){
    
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    Song.play();
    isplaying = true;
}

function pausesong(){
    
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    Song.pause();
    isplaying = false;
}

function playpausedecider(){
    if(isplaying === true){
        pausesong();
    }
    else{
        playsong();
    }
}

function InitializeSong() {
    cover.src = `Images/${sortedPlayList[index].file}.jpg`;
    Song.src = `Songs/${sortedPlayList[index].file}.mp3`;
    Songname.innerText = sortedPlayList[index].Songname;
    nameband.innerText = sortedPlayList[index].artist;

}

function returnmusic(){
    if(index === 0){
        index = sortedPlayList.length - 1;
    }
    else{
        index -= 1;
    }
    InitializeSong();
    playsong();
}

function NextMusic(){
    if(index === sortedPlayList.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    InitializeSong();
    playsong();
}

function likeheart(){
    
    like.querySelector('.bi').classList.remove('bi-heart');
    like.querySelector('.bi').classList.add('bi-heart-fill');
    isplaying = true
}

function returnlikeheart(){
    
    like.querySelector('.bi').classList.remove('bi-heart-fill');
    like.querySelector('.bi').classList.add('bi-heart');
    isplaying = false
}

function Buttonlike(){
    if(isplaying === true){
        returnlikeheart();
    }
    else{
        likeheart();
    }   
}

function ProgressBar(){
    const barwidth = (Song.currentTime/Song.duration)*100;
    currentprogress.style.setProperty('--progress', `${barwidth}%`);
}

function jumpTo(event){
    const width = progresscontainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition/width)*Song.duration;
    Song.currentTime = jumpToTime;
}

function shuffleArray(preShuffledArray){
    const size = preShuffledArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffledArray[currentIndex];
        preShuffledArray[currentIndex] = preShuffledArray[randomIndex];
        preShuffledArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function ButtonEmb(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlayList);
        embaralharbutton.classList.add('button-active');
    }
    else{
        isShuffled = false;
            sortedPlayList = [...PlayList];
            shuffleArray(sortedPlayList);
            embaralharbutton.classList.remove('button-active');
        }
}



InitializeSong();

play.addEventListener('click', playpausedecider);
Return.addEventListener('click', returnmusic);
Next.addEventListener('click', NextMusic);
Song.addEventListener('timeupdate', ProgressBar)
like.addEventListener('click', Buttonlike); 
progresscontainer.addEventListener('click', jumpTo);
embaralharbutton.addEventListener('click', ButtonEmb);