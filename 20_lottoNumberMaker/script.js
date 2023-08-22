// Date format
Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


window.onload = function() {
	// topMenuInclude init
	topMenuInit();
		
	document.querySelector('.nowTime').innerText = new Date().format('yyyy년 MM월 dd일 E요일 HH:mm:ss');
	
	
	let rndCountAll = 0, rndCount = 0; lottoSum = 0;
	let lottoStr = '';
	while(rndCountAll < 5) {
		while (rndCount < 5) {
			let min = Math.ceil(1), max = Math.floor(45);
			let rndNum = Math.floor(Math.random() * ( max - min + 1 )) + min;

			if(lottoStr.indexOf(rndNum) > -1) {
				console.log('continue');
				continue;
			} else {
				lottoSum += rndNum;
				lottoStr += rndNum.toString().length < 2 ? '0' + rndNum : rndNum;
				if(rndCount != 4) lottoStr += ' / ';
				rndCount++;
			}
		}
		
		rndCount = 0;
		
		if(lottoSum > 119 && lottoSum < 171) {
			rndCountAll++;
			document.querySelector('.ln' + rndCountAll).innerText = lottoStr + ' = ' + lottoSum;
		}
		
		lottoSum = 0;
		lottoStr = '';
		
	}
}