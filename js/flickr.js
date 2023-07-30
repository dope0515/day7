const wrap = document.querySelector('.wrap');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSet = document.querySelector('.btnSet');
const btnSearch = document.querySelector('.btnSearch');
const btnInterest = document.querySelector('.btnInterest');
const btnMine = document.querySelector('.btnMine');
let enableEvent = true;

fetchData(setURL('interest'));

btnSearch.addEventListener('click', getSearch);

input.addEventListener('keypress', (e) => {
	if (e.code === 'Enter') getSearch();
});

btnMine.addEventListener('click', (e) => {
	if (e.target.classList.contains('on')) return;
	if (!enableEvent) return;
	enableEvent = false;
	resetGallery(e);
	fetchData(setURL('user', '164021883@N04'));
});

btnInterest.addEventListener('click', (e) => {
	if (e.target.classList.contains('on')) return;
	if (!enableEvent) return;
	enableEvent = false;
	resetGallery(e);
	fetchData(setURL('interest'));
});

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'userid') {
		resetGallery(e);
		fetchData(setURL('user', e.target.innerText));
	}
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

function getSearch(e) {
	const value = input.value.trim();
	input.value = '';
	if (value === '') return alert('검색어를 입력하세요.');

	resetGallery(e);
	fetchData(setURL('search', value));
}

function resetGallery(e) {
	const btns = btnSet.querySelectorAll('button');
	btns.forEach((el) => el.classList.remove('on'));
	loading.classList.remove('off');
	wrap.classList.remove('on');
	e?.target.classList.add('on');
}

function setURL(type, opt) {
	const key = '14e9b9e62db25fccd509a4f5c7505278';
	const num = 50;
	const baseURL = `https://www.flickr.com/services/rest/?per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	const myId = '164021883@N04';
	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

async function fetchData(url) {
	const response = await fetch(url);
	const json = await response.json();
	const items = json.photos.photo;
	if (items.length === 0) {
		loading.classList.add('off');
		wrap.classList.add('on');
		return alert('해당 검색어의 결과이미지가 없습니다.');
	}
	createList(items);
	setLoading();
}

function createList(arr) {
	let tags = '';
	arr.forEach((item) => {
		tags += `
				<li class='item'>
					<div>						
						<img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg' />						
						<p>${item.title}</p>	
						
						<article class='profile'>
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
							<span class='userid'>${item.owner}</span>
						</article>
					</div>
				</li>
			`;
	});
	wrap.innerHTML = tags;
}

function setLoading() {
	const imgs = wrap.querySelectorAll('img');
	let count = 0;

	for (const el of imgs) {
		//만약 이미지에 엑박이 뜨면 onerror이벤트로 잡아서 디폴트 이미지로 대체
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		//디폴트로 변경된 이미지까지 포함해서 카운트 (무한로딩에 빠지지 않음)
		el.onload = () => {
			count++;
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
	setTimeout(() => (enableEvent = true), 500);
}

function createPop(url) {
	document.body.style.overflow = 'hidden';
	const aside = document.createElement('aside');
	aside.className = 'pop';
	const tags = `
		<div class='con'>
			<img src=${url} />
		</div>
		<span class='close'>close</span>
	`;

	aside.innerHTML = tags;
	document.body.append(aside);
	setTimeout(() => aside.classList.add('on'), 0);
}

function removePop() {
	document.body.style.overflow = 'auto';
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');
	setTimeout(() => pop.remove(), 1000);
}
