let k = 4;
let r = 4;
let all = $('.piece')
let i = 0;
let arr = [];
let newDates;
let ourDates;
let setIntervalId2;

while (i < $('.piece').length) {
    let j = 0;
    while (j < 4) {
        $(all[i]).css('backgroundPosition', `${k * 100}px ${r * 100}px`)
        arr.push($(all[i]).addClass(`${i}`))
        k--
        i++
        j++
    }
    r--
}

for (let i = 0; i < $('.piece').length;i++){
    $('#stop').append(`<div class="sortable test ${i}"></div>`)
}

arr.sort(function(){
    return Math.random() - 0.5
})

for (const index in arr) {
    $('#start').append(arr[index]);
}

$('#start,.0,.1,.2,.3,.4,.5,.6,.7,.8,.9,.10,.11,.12,.13,.14,.15').sortable({
    connectWith: '.test',
    cursor: 'move',
})

let count = 0;
function sorter() {
    let i = 0;
    let children = $('.sortable').children();
    while (i < children.length) {
        if (!children[i].classList.contains(i)) {
            count++
        }
        i++
    }
}

let len = 0;
function sort() {
    let sortable = $('.sortable');
    for (let i = 0; i < 15; i++){
        if(sortable[i].children.length==0)
        len++   
    }
}
 
$('#check').click(() => {
    sorter()
    sort()
    if (len>0) {
        $('.text').text('Перемістіть усі елементи')
    }
    else if (count > 0) {
        $('.text').text('Щось не так!')
    }
    else {
        $('.text').text('Все правильно!')
        $('.button ').css('display', 'none');
    }
    count = 0;
    len = 0;
    clearInterval(setIntervalId2);
    $('.container ').css('display', 'none');
    $('.message ').css('display', 'flex');
})

function startTimer(time) {
    ourDates = new Date().getTime();
    setIntervalId2 = setInterval(() => {
        newDates = ((time * 60000)) - (new Date().getTime() - ourDates);
        let ss = Math.floor((newDates / 1000) % 60);
        let min = Math.floor((newDates / 60000) % 60);
        if (ss < 10) ss = "0" + ss;
        if (min < 10) min = "0" + min;
        if (min == 00 && ss == 00) {
            clearInterval(setIntervalId2);
            $('.container ').css('display', 'none');
            $('.message ').css('display', 'flex');
            $('.button ').css('display', 'none');
            $('.text').text('Може швидше?')
        }
        $('.timerDisplay').text(`${min}:${ss}`);
    })
}

function time(time) {
    $('.container ').css('display', 'flex');
    $('.but ').css('display', 'none');
    startTimer(time)
}

function test() {
    $('.container ').css('display', 'flex');
    $('.message ').css('display', 'none');
    $('.text').text('')
    time = newDates / 60000;
    startTimer(time);
}