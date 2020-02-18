var dayList = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var weekCheck = ['week_0','week_1','week_2',,'week_3','week_4','week_5','week_6']

var pageYear;
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);

var calTblBody = document.getElementById('calTblBody');
var viewYear = document.getElementById('viewYear');
var viewMonth = document.getElementById('viewMonth');

function drawCalendar(){
	
	calTblBody.innerHTML = '';
	leapYearCheck();
	
    let monthCnt = 100;
    let cnt = 1;
    for(var i = 0; i < 6; i++){
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);   
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);     
            }else{
                var $td = document.createElement('td');
				var $span = document.createElement('span')
                $span.textContent = cnt;
                $span.setAttribute('id', 'day_' + cnt);

				if(cnt === today.getDate() && today.getMonth() === first.getMonth() && today.getFullYear() === first.getFullYear()) {
					$span.setAttribute('class', 'today ' + 'week_' + j);
				}
				else
					$span.setAttribute('class', 'week_' + j);
				$td.appendChild($span);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
		calTblBody.appendChild($tr);
    }
	
	document.querySelector('#viewYear [value="' + first.getFullYear() + '"]').selected = true;
	//viewYear.innerHTML = first.getFullYear();
	
	
	viewMonth.innerHTML = first.getMonth() + 1;
	
	// 날짜 클릭시 현재 년, 월, 일 출력
	var days = document.querySelectorAll('td span[id^="day_"]'); 
	[].forEach.call(days,function(ddd){
		ddd.addEventListener("click",dayClick,false);
	});
}

for (var a = 1970; a < 2031; a++) {
	var $option = document.createElement('option');
	$option.innerText = a;
	$option.setAttribute('value', a);
	viewYear.appendChild($option);
}

drawCalendar();


function leapYearCheck() {
	if(first.getFullYear() % 4 === 0){
		pageYear = leapYear;
	} else {
		pageYear = notLeapYear;
	}
}

function prevMonth() {
	let tmpChange;
	
	if(first.getFullYear() < 1971 && first.getMonth() === 0) {
		alert('1970년 까지만 출력 가능합니다.');
		return false;
	}
	
	if((first.getMonth() - 1) === 0) {
		tmpChange = new Date(first.getFullYear() - 1, 12, 1);
	} else {
		tmpChange = new Date(first.getFullYear(), first.getMonth() - 1, 1);
	}
	first = tmpChange;
	drawCalendar();
	
	//console.log(first.getFullYear());
	//console.log(first.getMonth());
}

function nextMonth() {
	let tmpChange;
	
	if((first.getFullYear() + 1) > 2030 && first.getMonth() === 11) {
		alert('2030년 까지만 출력 가능합니다.');
		return false;
	}
	
	if((first.getMonth() + 1) > 12) {
		tmpChange = new Date(first.getFullYear() + 1, 12, 1);
	} else {
		tmpChange = new Date(first.getFullYear(), first.getMonth() + 1, 1);
	}
	first = tmpChange;
	drawCalendar();
}

function yearChange() {
	let tmpChange = new Date(viewYear.value, first.getMonth(), 1)
	first = tmpChange;
	drawCalendar();
	//console.log(viewYear.value);
}

function goToday() {
	first = new Date(today.getFullYear(), today.getMonth(),1);
	drawCalendar();
}

function dayClick(e){
	let week = this.getAttribute('class').replace('today ','').replace('week_', '');
    window.alert(first.getFullYear() + '년 ' + (first.getMonth() + 1) + '월 ' + this.innerHTML + '일 ' + dayList[week]);
}

document.getElementById('prevMontn').addEventListener('click', prevMonth);
document.getElementById('nextMontn').addEventListener('click', nextMonth);

viewYear.addEventListener('change', yearChange);

document.getElementById('goToday').addEventListener('click', goToday);

	
/*

currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
showMain();


function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}


function prev(){
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function(e){
      e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
      e1.remove();
    });
    if(pageFirst.getMonth() === 1){
        pageFirst = new Date(first.getFullYear()-1, 12, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()-1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

function next(){
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function(e){
      e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
      e1.remove();
    });
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(first.getFullYear()+1, 1, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar(); 
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('active');  
    clickStart();
    reshowingList();
}


function showMain(){
    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
}
var clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('active');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');
prevBtn.addEventListener('click',prev);
nextBtn.addEventListener('click',next);
var tdGroup = [];
function clickStart(){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}
function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    reshowingList();
}


function reshowingList(){
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    if(todoList[keyValue] === undefined){
        inputList.textContent = '';
        todoList[keyValue] = [];
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
    }else if(todoList[keyValue].length ===0){
        inputList.textContent = "";
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
    }else{
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
          e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
          e1.remove();
        });
        var $div = document.createElement('div');
        for(var i = 0; i < todoList[keyValue].length; i++){
            var $div = document.createElement('div');
            $div.textContent = '-' + todoList[keyValue][i];
            var $btn = document.createElement('button');
            $btn.setAttribute('type', 'button'); 
            $btn.setAttribute('id', 'del-ata');
            $btn.setAttribute('id', dataCnt+keyValue);
            $btn.setAttribute('class', 'del-data');
            $btn.textContent = delText;
            inputList.appendChild($div);
            inputList.appendChild($btn);
            $div.addEventListener('click',checkList);
            $btn.addEventListener('click',deleteTodo);
            inputBox.value = '';
            function deleteTodo(){
                $div.remove();
                $btn.remove();
            }
        }
    }

}
var inputBox = document.getElementById('input-box');
var inputDate = document.getElementById('input-data');
var inputList = document.getElementById('input-list');
var delText = 'X';
inputDate.addEventListener('click',addTodoList);
var dataCnt = 1;
var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
let todoList = [];
todoList[keyValue] = [];
function addTodoList(){
    var $div = document.createElement('div');
    $div.textContent = '-' + inputBox.value;
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button'); 
    $btn.setAttribute('id', 'del-ata');
    $btn.setAttribute('id', dataCnt+keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = delText;
    inputList.appendChild($div);
    inputList.appendChild($btn);
    todoList[keyValue].push(inputBox.value);
    dataCnt++;
    inputBox.value = '';
    $div.addEventListener('click',checkList);
    $btn.addEventListener('click',deleteTodo);
    function deleteTodo(){
        $div.remove();
        $btn.remove();
    }
}
console.log(keyValue);
function checkList(e){
    e.currentTarget.classList.add('checked');
}
*/