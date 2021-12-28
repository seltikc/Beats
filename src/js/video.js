let video;
let durationControl;
let soundControl;
let intervalId;

// кнопки
const playBtn = document.querySelector(".video__player-img");
const soundBtn = document.querySelector(".sound");
const playerPlayBtn = document.querySelector(".duration__img");


video = document.getElementById("player");

// как только плеер загрузится
video.addEventListener('loadeddata', function() {
    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click', soundOf);

    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");
    durationControl.addEventListener('input', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");
    soundControl.addEventListener('input', changeSoundVolume);
    // soundControl.addEventListener('onmousemove', changeSoundVolume);

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // soundControl.step = 1;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;


    //обрабатываем окончание видео
    video.addEventListener('ended', function() {
        playBtn.classList.toggle("video__player-img--active");
        video.currentTime = 0;
        playerPlayBtn.classList.remove('active');
    });
});



/*
  Воспроизведение видео
*/
function playStop() {
    // показывает или скрывает белую кнопку play
    playBtn.classList.toggle("video__player-img--active");

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение.

    if (video.paused) {
        // запускаем видео
        video.play();
        // Включаем функцию обновления прогресса
        intervalId = setInterval(updateDuration, 1000 / 60);
        // превращаем маленькую кнопку play в pause
        playerPlayBtn.classList.add('active');
        // Если, наоборот, проигрыавыется, то остановим.
    } else {
        // останавливаем видео
        video.pause();
        // останавливаем обновление прогресса
        clearInterval(intervalId);
        // превращаем маленькую кнопку pause в play
        playerPlayBtn.classList.remove('active');
    }
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
    // установить значение ползунка в текущее время
    video.currentTime = durationControl.value;
    updateDuration();
    // intervalId = setInterval(updateDuration, 1000 / 60);
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
    // устанавливаем в наш инпут текущее время
    durationControl.value = video.currentTime;
    // рассчитываем процент для закраски прогресса
    let step = video.duration / 100;
    let percent = video.currentTime / step;
    // устанавливаем стили
    durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #626262 ${percent}%)`;

}


/*
    Управление звуком
*/
function soundOf() {
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
        soundBtn.classList.remove('active');
    } else {
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
        soundBtn.classList.add('active');

    }
}

/*
    Управление звуком видео
*/
function changeSoundVolume() {
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
    video.volume 0 .... 1 
    soundControl 0 .... 10
        */

    video.volume = soundControl.value / 10;
    if (video.volume == 0) {
        soundBtn.classList.add('active');
    } else {
        soundBtn.classList.remove('active');
    }
    console.log('значение volume у видео ' + video.volume);
    console.log('значение value у micLevel ' + soundControl.value / 10);
    /**У ползунка изначально задано минимальное значение 0 и максимальное 10 чтоб дать нам 10 положений
     * регулировки
     */
}

