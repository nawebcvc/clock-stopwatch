const sec = document.querySelector('.s'); //qs
const min = document.querySelector('.m'); //qs
const hour = document.querySelector('.h'); //qs
const numHours = document.querySelector('.hours'); //qs
const numMinutes = document.querySelector('.minutes'); //qs
const links = document.querySelectorAll('.tabsItem'); //qsa
// document.querySelectorAll('selector'); необходимо нам чтобы мы подключились ко всем (точнее только двум) селекторам имени тега
// т.к в html 2 селектора имени тега идентичны и мы хотим подключится к ним
// console.log(links); // NodeList(2) [li.tabsItem.active, li.tabsItem] 
const tabs = document.querySelectorAll('.tabsContentItem'); //qsa
// console.log(tabs); // NodeList(2) [div.clock.tabsContentItem.active, div.stopwatch.tabsContentItem]
let f = 360; // для решения 2ой проблемы transition, читаете ниже
const btn = document.querySelector('.stopwatch__btn'); // для кнопки start в секундомере
const span = document.querySelector('.tabsLink__span'); // для точки в секундомере
const stopwatchHours = document.querySelector('.stopwatch__hours'); // для точки в секундомере
const stopwatchMinutes = document.querySelector('.stopwatch__minutes'); // для точки в секундомере
const stopwatchSeconds = document.querySelector('.stopwatch__seconds'); // для точки в секундомере


function clock() {  
    // У JS есть класс по умолчанию наз data который возвращает текущий время, текущий день недели, текущий часовой пояс
    // Чтобы сделать копию от этого класса нужно воспользоваться оператором "new" = new Date()
    let time = new Date();
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();
    
    // для того чтобы стрелка секунд двигалась с рывками:
    // sec.style.transform = `rotate(${seconds * 6}deg)`;
    // для того чтобы стрелка секунд двигалась плавно:
    sec.style.transition = `all 1s linear`;
    // НО из-за transition возникнут две проблемы в нашем ситуации:
    // 1) transition - это плавность - это задержка (задержка зависит от скорости плавности), 
    // например у нас 1секундная плавность - в связи с чем, секундная стрелка будет отставать на одну секунду от реального времени
    // 2) transition работает до 360 градусов и после возвращается на начальную точку (на 0 градус) и так циклично
    // и в нашем случаи, стрелка будет вращаться до 12часов после "вернется!" обратно в 12часов по обратному пути, а не продолжая движения по часовым направления движения 
    if (seconds * 6 == 0 || f > 360){
        sec.style.transform = `rotate(${f + 6}deg)`; // добавления "6" (точнее 6ти градусов) необходим для решения 1ой проблемы transition - задержки - отставания от реального времени, т.к 6 градусов = 1 секунда
        f += 6; // кусок кода необходим для решения 2ой проблемы transition - для того чтобы стрелка не вернулась назад (на нулевой градус) и продолжала идти дальше (дальше 360 градусов - до бесконечности)
    } else {
        sec.style.transform = `rotate(${(seconds + 1) * 6}deg)` // код понятен зачем :) (seconds + 1) - 1ая проблема transition (выше написано про это!)
    };
    min.style.transform = `rotate(${minutes * 6}deg)`;
    hour.style.transform = `rotate(${hours * 30}deg)`;

    numHours.innerHTML = (hours < 10) ? '0' + hours : hours;
    numMinutes.innerHTML = (minutes < 10) ? '0' + minutes : minutes;

    setTimeout(() => {clock()}, 1000); // ниже написано про этот метод
    // когда функция вызывает самого себя - называется рекурсией
    // У JS есть встроенный метод set timeout, он может запустить какое-то функцию через определенную количество времени или как иногда его используют в JS - для рекурсии какого-либо функции (повторения выполнения кода функции)
    // setTimeout(() => {}, timeout); // sett
    // метод принимает два аргумента: "() = {}" - функция и "timeout" количество времени миллисекундах (функция которая выполнится через определенное количество времени):
    // setTimeout(() => {clock()}, 1000);
    // метод выполнится через секунду (1000мс = 1с), и браузер пойдет дальше читать код, чтобы зациклить функцию необходимо поставить во внутр функции clock
}

clock();

// мы должны пробегаться через массив (links) т.к выше: 2 селектора имени тега идентичны и мы хотим подключится к каждым из них
// на примере ниже мы будем реагировать на нажатия пользователя:
/* for (let i = 0; i < links.length; i++) {
    const element = links[i];

    element.onclick = function(){
        console.log('Нажали');
    }
} */
// также код выше можно было написать так (без for):
// links[0].onclick = function(){console.log('Нажали')};
// links[1].onclick = function(){console.log('Нажали')};

// также события click можно записать с помощью метода(): addEventListener('название события', 'функция', '')
/* for (let i = 0; i < links.length; i++) {
    const element = links[i];
    element.addEventListener('click', function(){console.log('Привет');})
} */
// у .onclick метода (не addEventListener()) имеется ключик defaultPrevented: false, который отменяет все события по умолчанию который есть у браузера, переход по ссылкам самого тега и т.д
/* links[0].onclick = function (event) {  
    console.log(event);
    // ...
    // currentTarget: null
    // defaultPrevented: false
    // detail: 1
    // ...
    event.preventDefault();
} */

// применение для нашей ситуации, т.е 1) нужно удалить все дополнительные классы active у тегов li (active) в начале 2) при клике изменять active

//чтобы изменять класс тегов необходим метод .classList(), рассмотрим ниже с помощью console.dir() 
/* for (let i = 0; i < links.length; i++) {
    const element = links[i];
    element.addEventListener('click', function(){
        console.dir(this);
        // ...
        // classList: DOMTokenList(2) ['tabsItem', 'active', value: 'tabsItem active']
        // то, что внутри .classList() (-также те методы которые нам нужны для данной ситуации - 3метода add, remove и toggle
        // (и четвертый для проверка на наличие класса - contains())):
        // classList: DOMTokenList(2)
        //     0: "tabsItem"
        //     1: "active"
        //     length: 2
        //     value: "tabsItem active"
        //     [[Prototype]]: DOMTokenList
        //         add: ƒ add()   --------------добавляет какой-то класс для данного item в скобках метода:
        //              this.classList.add('classname')
        //         contains: ƒ contains() ------проверяет наличие класса у item
        //              console.log(this.classList.contains('classname')) // true/false в скобках метода:
        //         entries: ƒ entries()
        //         forEach: ƒ forEach()
        //         item: ƒ item()
        //         keys: ƒ keys()
        //         length: (...)
        //         remove: ƒ remove() ----------удаляет какой-то класс для данного item в скобках метода:
        //              this.classList.remove('classname')
        //         replace: ƒ replace()
        //         supports: ƒ supports()
        //         toString: ƒ toString()
        //         toggle: ƒ toggle() ----------заменяет какой-то класс у данного item в скобках метода:
        //              this.classList.toggle('classname')
        //         value: (...)
        //         values: ƒ values()
        //         constructor: ƒ DOMTokenList()
        //         Symbol(Symbol.iterator): ƒ values()
        //         Symbol(Symbol.toStringTag): "DOMTokenList"
        //         get length: ƒ length()
        //         get value: ƒ value()
        //         set value: ƒ value()
        //         [[Prototype]]: Object
        //             constructor: ƒ Object()
        //             hasOwnProperty: ƒ hasOwnProperty()
        //             isPrototypeOf: ƒ isPrototypeOf()
        //             propertyIsEnumerable: ƒ propertyIsEnumerable()
        //             toLocaleString: ƒ toLocaleString()
        //             toString: ƒ toString()
        //             valueOf: ƒ valueOf()
        //             __defineGetter__: ƒ __defineGetter__()
        //             __defineSetter__: ƒ __defineSetter__()
        //             __lookupGetter__: ƒ __lookupGetter__()
        //             __lookupSetter__: ƒ __lookupSetter__()
        //             __proto__: (...)
        // ...
    })
} */

// РЕАЛИЗАЦИЯ ИЗМЕНЕНИЯ КЛАССА ТЕГОВ У tabsItem и tabsContentItem -- ОТДЕЛЬНО
// для тега tabsLink
// применение методов с помощью циклов и без:
/* for (let i = 0; i < links.length; i++) {
    const element = links[i];
    element.addEventListener('click', function () {  
        for (let x = 0; x < links.length; x++) {
            const elem = links[x];
            elem.classList.remove('active');
        }
        element.classList.add('active')
    })
} */
// реализация без циклов
/* links[0].addEventListener('click', function () {  
    links[1].classList.remove('active')
    links[0].classList.add('active')
})
links[1].addEventListener('click', function () {  
    links[0].classList.remove('active')
    links[1].classList.add('active')
}) */
// для тега tabsContentItem
/* for (let i = 0; i < links.length; i++) {
    const element = links[i];
    const tabselem = tabs[i]
    element.addEventListener('click', function () {  
        for (var x = 0; x < links.length; x++) {
            tabs[x].classList.remove('active');
        }
        tabselem.classList.add('active');
    })
} */
// реализация без циклов
/* links[0].addEventListener('click', function () {  
    tabs[1].classList.remove('active')
    tabs[0].classList.add('active')
})
links[1].addEventListener('click', function () {  
    tabs[0].classList.remove('active')
    tabs[1].classList.add('active')
}) */


// РЕАЛИЗАЦИЯ ИЗМЕНЕНИЯ КЛАССА ТЕГОВ У tabsItem и tabsContentItem -- ВМЕСТЕ
for (let i = 0; i < links.length; i++) {
    // const element = links[i];
    // const elem = tabs[i];
    links[i].addEventListener('click', function () {  
        for (let x = 0; x < links.length; x++) {
            // const elem = links[x];
            links[x].classList.remove('active');
            tabs[x].classList.remove('active');
        }
        links[i].classList.add('active')
        tabs[i].classList.add('active')
    })
};
// реализация без циклов
/* links[0].addEventListener('click', function () {  
    links[1].classList.remove('active')
    tabs[1].classList.remove('active')
    links[0].classList.add('active')
    tabs[0].classList.add('active')
})
links[1].addEventListener('click', function () {  
    links[0].classList.remove('active')
    tabs[0].classList.remove('active')
    links[1].classList.add('active')
    tabs[1].classList.add('active')
}) */

// механизм секундомера
btn.addEventListener('click', () => {
    if (btn.innerHTML == 'start') {
        btn.innerHTML = 'stop';
        // изменение текста внутри кнопки start в секундомере
        span.classList.add('active');
        // изменение точки в секундомере
        start(); // изменение циферблат секундомера
    }else if(btn.innerHTML == 'stop') {
        btn.innerHTML = 'clear';
        span.classList.remove('active');
        span.classList.add('active_clear');
    }else if(btn.innerHTML == 'clear') {
        // при clear очищаем вернем все изначальные значения:
        // (1) вернем start у кнопки, (2) удалим точку в секундомере, (3, 4, 5) вернем изначальные значения секунд, минут и часов 
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
            if (stopwatchSeconds.innerHTML == '59') {
                // когда секундны доходит до 59, добавляем одну минуту
                stopwatchSeconds.innerHTML = 0;
                stopwatchMinutes.innerHTML++;
            }else if (stopwatchMinutes.innerHTML == '59') {
                // когда минуты доходит до 59, добавляем один час
                stopwatchMinutes.innerHTML = 0;
                stopwatchHours.innerHTML++;
            }
            stopwatchSeconds.innerHTML++;z
            start();
            // вызываем самого себя - рекурсивная функция
            // когда кнопка равна stop, мы увеличиваем секунды и заново вызываем эту функцию start
        }
    }, 1000);

 }

