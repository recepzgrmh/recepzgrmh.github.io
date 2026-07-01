let intervalId; // Interval kimliğini saklamak için bir değişken
let time = document.querySelector("#time");
const start = document.querySelector(".start-button");
const buttonList = document.querySelectorAll(".button-list button");
const count = document.querySelector(".count");
const situation = document.querySelector(".situation");

// Default
var countdownTime = 25 * 60;
var isTimerRunning = false;

time.innerHTML = "25:00";

buttonList.forEach(button => {
    button.addEventListener("click", function () {
        buttonList.forEach(btn => btn.classList.remove('active'));
        this.classList.add("active");

        updateTimeAndColors();
    });
});

function updateTimeAndColors() {
    switch (document.querySelector(".active").innerHTML) {
        case "Pomodoro":
            window.location.reload();
            break;
        case "Short Break":
            time.innerHTML = "05:00";
            countdownTime = 5 * 60;
            count.innerHTML = "#2";
            situation.innerHTML = "Time for a break!";
            setColors("--lightturquoise", "--turquoise", "--darkturquoise", "--lightturquoise");
            break;
        case "Long Break":
            time.innerHTML = "15:00";
            countdownTime = 15 * 60;
            count.innerHTML = "#3";
            situation.innerHTML = "Time for a break!";
            setColors("--lightblue", "--blue", "--darkblue", "--lightblue");
            break;
    }
}

function setColors(lightColor, baseColor, darkColor, mainSectionColor) {
    document.querySelectorAll('*').forEach(element => {
        element.style.backgroundColor = `var(${baseColor})`;
    });

    document.querySelectorAll(".light").forEach(element => {
        element.style.backgroundColor = `var(${lightColor})`;
    })

    document.querySelectorAll(".button-list button:not(.active)").forEach(element => {
        element.style.backgroundColor = `var(${lightColor})`;
    });

    const elementsToChangeBackground = [".main-section", ".button-list", ".button-list button", ".light"];
    elementsToChangeBackground.forEach(element => {
        document.querySelector(element).style.backgroundColor = `var(${mainSectionColor})`;
    });

    document.querySelector(".button-list .active").style.backgroundColor = `var(${darkColor})`;
    start.style.backgroundColor = "var(--white)";
    start.style.color = `var(${baseColor})`;
}

function writeTime() {
    // Sayacın çalıştığı div elementi
    var countdownElement = document.getElementById("time");

    // Her 1 saniyede bir güncellenen bir interval
    updateCountdown();

    // Her 1 saniyede bir güncellenen bir interval
    intervalId = setInterval(updateCountdown, 1000); // 1000 milisaniye = 1 saniye

    function updateCountdown() {
        // Kalan dakika ve saniyeyi hesapla
        var minutes = Math.floor(countdownTime / 60);
        var seconds = countdownTime % 60;

        // Sayacı ekrana yazdır
        countdownElement.innerHTML = padZero(minutes) + ":" + padZero(seconds);

        // Zamanı bir saniye azalt
        countdownTime--;

        // Zaman sıfıra ulaştığında interval'i temizle
        if (countdownTime < 0) {
            clearInterval(intervalId);
            countdownElement.innerHTML = "Süre bitti!";
            countdownElement.style.fontSize = "3rem";
        }
    }
}

// 10'dan küçük sayıları iki basamaklı hale getir
function padZero(number) {
    return (number < 10 ? "0" : "") + number;
}



start.addEventListener("click", function () {
    if (isTimerRunning) {
        // If the timer is running, stop it
        clearInterval(intervalId);
        start.innerHTML = "Start";
    } else {
        // If the timer is not running, start it
        writeTime();
        start.innerHTML = "Stop";
    }
    // Toggle the timer state
    isTimerRunning = !isTimerRunning;
});
