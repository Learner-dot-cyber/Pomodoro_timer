let Focus_min = document.getElementById("Focus_min");
let Focus_sec = document.getElementById("Focus_sec");
let Focus_mess = document.getElementById("Focus_mess");
let ShortBreak_mess = document.getElementById("ShortBreak_mess");
let LongBreak_mess = document.getElementById("LongBreak_mess");
let cycleTitle = document.getElementById("cycleTitle");
let RoundNum = document.getElementById("RoundNum");


let Start = document.getElementById("Start");
let Reset = document.getElementById("Reset");
let Pause = document.getElementById("Pause");

let intervalId = null;
const player2 = new Audio();

Start.onclick = timer1;


let i = 0;
let seconds = 0;
let count = 1;
Focus_mess.textContent = "Press Start to start focusing."

function timer(number){
    
    Pause.textContent = "Pause";
    if (number == 0){
        if (i == 0 || i == 2 || i == 4 || i == 6){
            RoundNum.textContent = "Round #" + String(count);
            cycleTitle.textContent = "Focus #" + String(i/2 +1);
            Focus_min.textContent = "25";
            Focus_sec.textContent = "00";
            number = 1;
        }else if (i == 1 || i == 3 || i == 5){
                RoundNum.textContent = "Round #" + String(count);
                cycleTitle.textContent = "Short Break #" + String((i-1)/2 +1);
                Focus_min.textContent = "05";
                Focus_sec.textContent = "00";
                number = 300;
        }else if (i == 7){
                RoundNum.textContent = "Round #" + String(count);
                cycleTitle.textContent = "Long Break";
                Focus_min.textContent = "10";
                Focus_sec.textContent = "00";
                number = 600;
                i = 0;
        }
    }
    let initial_num = number;

    Focus_mess.textContent = "";
    ShortBreak_mess.textContent = "";
    LongBreak_mess.textContent = "";

    intervalId = setInterval(() =>{
        seconds = number;
        if (number != 0){

            if (Focus_sec.textContent == "00"){
                if (Number(Focus_min.textContent) == 1){
                Focus_min.textContent = "00";
                Focus_sec.textContent = "60";
               }else if (number == initial_num-1){
                Focus_min.textContent = String(Number(Focus_min.textContent)-1);
               }else if(Number(Focus_min.textContent) >= 11){
                Focus_min.textContent = String(Number(Focus_min.textContent)-1);
               }else{
                Focus_min.textContent = "0" + String(Number(Focus_min.textContent)-1);
               }
            }

           if (Number(Focus_sec.textContent) == 0 && Number(Focus_min.textContent) == 0){
            number = 0;
           }else if (Number(Focus_sec.textContent) == 0){
            Focus_sec.textContent = "59";
            number -= 1;
           }else if (Number(Focus_sec.textContent) >= 11){
            Focus_sec.textContent = String(Number(Focus_sec.textContent)-1);
            number -= 1;
           }else{
            Focus_sec.textContent = "0" + String(Number(Focus_sec.textContent)-1);
            number -= 1;
           }

           

            }else{
            i += 1;
            
            const player1 = new Audio();
            player1.src = "fin_timer.mp3";
            player1.volume = 1;
            player1.play();
            player1.volume = 1;
            player1.addEventListener("error", () => {
                console.error("Failed to load fin_timer.mp3");
            });
            player1.play().catch((err) => {
                console.warn("Playback blocked or failed:", err);
             });
            
            Focus_min.textContent = "";
            Focus_sec.textContent = "";
            if(i == 0 || i == 2 || i == 4 || i == 6){
                Focus_mess.textContent = "Press Start to start focusing.";
                cycleTitle.textContent = "";
            }else if (i == 7){
                cycleTitle.textContent = "";
                LongBreak_mess.textContent = "Press Start to start the long break.";
                count += 1;
                 }else{
                    cycleTitle.textContent = "";
                    ShortBreak_mess.textContent = "Press Start to start the short break.";
                }
                clearInterval(intervalId);
        }
    },1000);
} 

function timer1(){
    clearInterval(intervalId)
    timer(seconds);
}

Pause.onclick = pause;
Pause.textContent = "Pause";
let pause_number = seconds-1;
let pause_min = Focus_min.textContent;
let pause_sec = Focus_sec.textContent;

function pause(){
    if (seconds!=0){
        if (Pause.textContent == "Pause"){
            Pause.textContent = "Resume";
            pause_number = seconds-1;
            pause_min = Focus_min.textContent;
            pause_sec = Focus_sec.textContent;
            clearInterval(intervalId);
        }else{
            Pause.textContent = "Pause";
            Focus_min.textContent = pause_min;
            Focus_sec.textContent = pause_sec ;
            timer(pause_number);
        }
    }
}

Reset.onclick = reset;

function reset(){
    if (seconds!=0){
        if (i == 0 || i == 2 || i == 4 || i == 6){
            RoundNum.textContent = "Round #" + String(count);
            cycleTitle.textContent = "Focus #" + String(i/2 +1);
            Focus_min.textContent = "25";
            Focus_sec.textContent = "00";
            seconds = 1;
        }else if (i == 1 || i == 3 || i == 5){
                RoundNum.textContent = String(count);
                cycleTitle.textContent = "Short Break #" + String((i-1)/2 +1);;
                Focus_min.textContent = "05";
                Focus_sec.textContent = "00";
                seconds = 300;
        }else if (i == 7){
                RoundNum.textContent = String(count);
                cycleTitle.textContent = "Long Break";
                Focus_min.textContent = "10";
                Focus_sec.textContent = "00";
                seconds = 600;
        }
        clearInterval(intervalId)
    }
    Pause.textContent = "Pause";
    pause()
}


const sounds = {
    beach: "beach.mp3",
    forest: "forest.mp3",
    fire: "fire.mp3",
    cafe: "cafe.mp3",
    BrownNoise: "BrownNoise.mp3"    
};

player2.addEventListener("timeupdate", () => {
    if (player2.duration && player2.currentTime >= player2.duration - 0.15) {
        player2.currentTime = 0;
        player2.play().catch(() => {});
    }
});

player2.loop = false;
player2.volume = 1;

const soundRadios = document.querySelectorAll('input[name="sound"]');

soundRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (radio.checked) {
            player2.src = sounds[radio.id];
            player2.play();
        }
    });
});
