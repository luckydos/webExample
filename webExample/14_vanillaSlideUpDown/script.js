window.onload = function() {
	document.querySelector('.sButton').addEventListener('click', function(evt) {
		let contentArea = document.querySelector('.contentArea');
		if(contentArea.classList.contains('hide')) {
			contentArea.classList.remove('hide');
		} else {
			contentArea.classList.add('hide');
		}
		
		console.log(contentArea.getAttribute('class'));
		console.log(contentArea.getAttribute('class').indexOf('hide'));
	})
}