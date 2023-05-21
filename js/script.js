const sec = document.querySelector('.s'); 
const min = document.querySelector('.m'); 
const hour = document.querySelector('.h'); 
const numHours = document.querySelector('.hours'); 
const numMinutes = document.querySelector('.minutes'); 
const links = document.querySelectorAll('.tabsItem'); 
const tabs = document.querySelectorAll('.tabsContentItem'); 
let f = 360; 
const btn = document.querySelector('.stopwatch__btn'); 
const span = document.querySelector('.tabsLink__span'); 
const stopwatchHours = document.querySelector('.stopwatch__hours'); 
const stopwatchMinutes = document.querySelector('.stopwatch__minutes');
const stopwatchSeconds = document.querySelector('.stopwatch__seconds'); 


function clock() {
    let time = new Date();
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    sec.style.transition = `all 1s linear`;
      if (seconds * 6 == 0 || f > 360) {
        sec.style.transform = `rotate(${f + 6}deg)`;
        f += 6; 
    } else {
        sec.style.transform = `rotate(${(seconds + 1) * 6}deg)` 
    };
    min.style.transform = `rotate(${minutes * 6}deg)`;
    hour.style.transform = `rotate(${hours * 30}deg)`;

    numHours.innerHTML = (hours < 10) ? '0' + hours : hours;
    numMinutes.innerHTML = (minutes < 10) ? '0' + minutes : minutes;

    setTimeout(() => { clock() }, 1000); 
}

clock();

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
        for (let x = 0; x < links.length; x++) {
            links[x].classList.remove('active');
            tabs[x].classList.remove('active');
        }
        links[i].classList.add('active')
        tabs[i].classList.add('active')
    })
};

btn.addEventListener('click', () => {
    if (btn.innerHTML == 'start') {
        btn.innerHTML = 'stop';
        span.classList.add('active');
        start();
    } else if (btn.innerHTML == 'stop') {
        btn.innerHTML = 'clear';
        span.classList.remove('active');
        span.classList.add('active_clear');
    } else if (btn.innerHTML == 'clear') {
        btn.innerHTML = 'start';
        span.classList.remove('active_clear');
        stopwatchSeconds.innerHTML = 0;
        stopwatchMinutes.innerHTML = 0;
        stopwatchHours.innerHTML = 0;
    }

});

function start() {

    setTimeout(() => {
        if (btn.innerHTML == 'stop') {
            stopwatchSeconds.innerHTML++;
            if (stopwatchSeconds.innerHTML == '60') {
                stopwatchSeconds.innerHTML = 0;
                stopwatchMinutes.innerHTML++;
            } else if (stopwatchMinutes.innerHTML == '60') {
                stopwatchMinutes.innerHTML = 0;
                stopwatchHours.innerHTML++;
            }
            start();
        }
    }, 1000);
}

