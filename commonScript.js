window.onload = function() {
	// topMenuInclude init
	topMenuInit();
}

function topMenuInit() {
	includeHTML(topMenuCallback);
}

function topMenuCallback() {
	// topMenuInclude Button
	setTimeout(function() {
		Array.from(document.querySelectorAll('.topMenuBtn')).forEach(function(target) {
			let targetVal = target.getAttribute('id');
			// console.log(targetVal);
			if(targetVal === 'rootButton') {
				target.addEventListener('click', function(e) {
					location.href = '/';
				});
			} else if(targetVal === 'homeButton') {
				target.addEventListener('click', function(e) {
					location.href = '/webExample';
				});
			} else if(targetVal === 'backButton') {
				target.addEventListener('click', function(e) {
					history.back();
				});
			}
		});
	}, 500);
}


// topMenuInclude
// https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML(cb) {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
					/* Remove the attribute, and call this function once more: */
					elmnt.removeAttribute("w3-include-html");
					includeHTML(cb);
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/* Exit the function: */
			return;
		}
	}
	if(cb) {cb();}
}
