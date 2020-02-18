window.onload = function() {
	var vSlider = document.querySelector('.sliderWrap > ul.slider'),
		vPause = document.querySelector('#vPause'),
		index = 0,					
		oneWidth = vSlider.offsetWidth, allWidth = vSlider.scrollWidth;
	
	// 슬라이드 개수(cloneNode 제외)
	var sLength = vSlider.querySelectorAll('li').length - 1;

	vSlider.appendChild(vSlider.querySelector('li').cloneNode(true));
	
	var sInterval = setInterval(show, 1000);

	vPause.addEventListener('click', function(event) {
		if(event.target.getAttribute('value') === "pause") {
			event.target.setAttribute('value', 'start');
			clearInterval(sInterval);
		} else {
			event.target.setAttribute('value', 'pause');
			sInterval = setInterval(show, 1000);
		}
	});

	document.querySelector('#vPrev').addEventListener('click', function(event) {
		if(vPause.getAttribute('value') === "pause") {
			vPause.setAttribute('value', 'start');
			clearInterval(sInterval);
			// transition remove
			vSlider.classList.remove('mtran');
		}
		
		if(index === 0) {
			index = (oneWidth * sLength);
		} else {
			index -= oneWidth;
		}

		vSlider.style.marginLeft = (-index) + 'px';

		indexOutput();
	});

	document.querySelector('#vNext').addEventListener('click', function(event) {
		if(vPause.getAttribute('value') === "pause") {
			vPause.setAttribute('value', 'start');
			clearInterval(sInterval);
			// transition remove
			vSlider.classList.remove('mtran');
		}
		
		if(vPause.getAttribute('value') === "pause") {
			vPause.setAttribute('value', 'start');
			clearInterval(sInterval);
		}
		if(index >= (oneWidth * sLength)) {
			index = 0;
		} else {
			index += oneWidth;
		}

		vSlider.style.marginLeft = (-index) + 'px';

		indexOutput();
	});

	function show() {
		index += oneWidth;
		if(index > allWidth) {
			// last +1 slide (1)
			vSlider.classList.remove('mtran');
			vSlider.style.marginLeft = '0px';
			index = 0;
			clearInterval(sInterval);
			setTimeout(function() {
				index = oneWidth;
				vSlider.classList.add('mtran');
				vSlider.style.marginLeft = (-index) + 'px';
				sInterval = setInterval(show, 1000);
			}, 100);
		} else {
			vSlider.classList.add('mtran');
			vSlider.style.marginLeft = (-index) + 'px';
		}
		indexOutput();
	}

	function indexOutput() {
		document.getElementById('output').innerText = 'index: ' + index;
	}
}