const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();
});

//텍스트항목 인증처리 함수
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();

	if (text.length < len) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트를 ${len}글자 이상 입력하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//이메일항목 인증처리 함수
function isEmail(name) {
	const input = form.querySelector(`[name=${name}]`);

	//1차인증 - @가 없으면  인증실패
	if (!/@/.test(input.value)) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `이메일주소에 @를 포함하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		const [forward, backward] = input.value.split('@');
		console.log(forward);
		console.log(backward);

		//2차인증 - @가 있더라도 앞뒤로 문자값이 없으면 인증 실패
		if (!forward || !backward) {
			resetErr(input);
			const errMsg = document.createElement('p');
			errMsg.innerText = `@앞뒤로 문자값이 포함되어야 합니다.`;
			input.closest('td').append(errMsg);
			return false;
		} else {
			const [txt1, txt2] = backward.split('.');
			//3차인증
			if (!txt1 || !txt2) {
				resetErr(input);
				const errMsg = document.createElement('p');
				errMsg.innerText = `.앞뒤로 문자값이 포함되어야 합니다.`;
				input.closest('td').append(errMsg);
				return false;
			} else {
				resetErr(input);
				return true;
			}
		}
	}
}

//에러메세지 제거함수
function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) el.closest('td').querySelector('p').remove();
}
