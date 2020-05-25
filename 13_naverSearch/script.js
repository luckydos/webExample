window.onload = function () {
	let query = document.getElementById('query');
	query.focus();
	document.getElementsByClassName('searchLogoBox')[0].addEventListener('click', function(e) {
		if(query.value === '') {
			alert('검색어를 입력하세요.');
			query.focus();
		} else {
			nSearchform.submit();
		}

		return;
	});

	document.getElementsByClassName('searchTextBox')[0].addEventListener('keydown', function(e) {
		let key = e.which || e.keyCode;
		//console.log(key);
		if(key === 13) {
			//alert('enter key press!!');
			if(query.value === '') {
				alert('검색어를 입력하세요.');
				e.preventDefault();
				query.focus();
			} else {
				nSearchform.submit();
			}
		}
	});

	// topMenuInclude init
	topMenuInit();
};