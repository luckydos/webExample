document.getElementById('modalRun').addEventListener('click', modalRunClick);
document.getElementById('modalClose').addEventListener('click', modalCloseClick);
document.getElementById('modalContentBack').addEventListener('click', modalCloseClick);

function modalRunClick() {
	//alert('modalRun Clicked!!');
	document.getElementById('modalContentBack').classList.add('on')
	document.getElementById('modalContent').classList.add('on')
}

function modalCloseClick() {
	document.getElementById('modalContentBack').classList.remove('on')
	document.getElementById('modalContent').classList.remove('on')
}