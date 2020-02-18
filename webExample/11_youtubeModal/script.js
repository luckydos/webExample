var modalContent = document.getElementById('modalContent');
var modalContentBack = document.getElementById('modalContentBack');
var modalRun = document.getElementsByClassName('modalRun');

var player;

// setTimeout var
var ytPlayerInit, ytPlayerGetTitle

for(var i = 0; i < modalRun.length; i++) {
	modalRun[i].addEventListener('click', modalRunClick);
}
document.getElementById('modalClose').addEventListener('click', modalCloseClick);
modalContentBack.addEventListener('click', modalCloseClick);

function modalRunClick(event) {
	modalContentBack.classList.add('on');
	modalContent.classList.add('on');

	// YouTube Player Add
	var videoId = event.target.getAttribute('video-id');
	var videoStart = event.target.getAttribute('video-start');
	if (videoStart === '') videoStart = 0;
	document.getElementById('ytbPlayer').src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?start=' + videoStart + '&autoplay=1&enablejsapi=1';

	// This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	ytPlayerInit = setTimeout(function() {
		player = new YT.Player('ytbPlayer');
	}, 1000);

	ytPlayerGetTitle = setTimeout(function() {
		var videoTitle = player.getVideoData().title;
		//console.log(player.getVideoData().title);
		document.querySelector('.playerTitle').setAttribute('title', videoTitle);
		document.querySelector('.playerTitle').innerText =  videoTitle;
	}, 3000);
}

function modalCloseClick() {
	let defaultIframeString = '<iframe id="ytbPlayer" width="560" height="315" src="" '
		+ 'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; '
		+ 'picture-in-picture" allowfullscreen></iframe>';
	
	modalContentBack.classList.remove('on');
	modalContent.classList.remove('on');

	// YouTube Player Remove
	player.destroy();
	clearTimeout(ytPlayerInit);
	clearTimeout(ytPlayerGetTitle);
	document.querySelector('.playerTitle').setAttribute('title', 'YouTube Player');
	modalContent.querySelector('.playerTitle').innerText = 'YouTube Player';
	modalContent.querySelector('.youtubeWrap' ).innerHTML = defaultIframeString;
}