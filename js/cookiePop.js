/*
  쿠키는 사용자의 컴퓨터에 물리적인 파일 형태로 저장하는 경량의 텍스트 자료
  name=value 형식으로 저장, 쿠키 생성시 쿠키의 생성주기 설정 가능
  name=value; path=/; expires=만료일(전세계 표준시간대로 변경)
  쿠키확인 : document.cookie

  문자열.indexOf(찾을 문자열) : 전체 문자열에서 인수로 전달한 문자열의 위치값 반환
  indexOf가 인수로 전달된 문자열을 전체 문자값에서 찾지 못하면 -1을 반환
*/

const pop = document.querySelector('#pop');
const ck = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');
const btnShowCookie = document.querySelector('header h1');
const btnDelCookie = document.querySelectorAll('#gnb li')[0];
//브라우저 로딩시 쿠키 유무에 따라 팝업 보임, 숨김 처리
document.cookie.indexOf('today=done') < 0 ? (pop.style.display = 'block') : (pop.style.display = 'none');

//팝업 닫기 버튼 클릭시 체크가되어있으면 쿠키 생성히 팝업 닫기
//그렇지 않으면 그냥 팝업닫기
btnClose.addEventListener('click', () => {
	if (ck.checked) setCookie('today', 'done', 1);
	pop.style.display = 'none';
});

//현재 document객체이 등록된 쿠키 확인 (테스트)
/*
btnShowCookie.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});
*/

//today=done이라는 쿠키 강제 삭제 (테스트)
/*
btnDelCookie.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('today=done 쿠키삭제');
});
*/

//쿠키 이름과 벨류값을 설정해서 원하는 일수만큼 쿠키 생성 함수
function setCookie(name, value, expires) {
	let today = new Date();
	let duedate = today.getDate() + expires;
	today.setDate(duedate);
	document.cookie = `${name}=${value}; path=/; expires=${today.toUTCString()}`;
}
