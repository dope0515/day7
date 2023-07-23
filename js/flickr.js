const wrap = document.querySelector('.wrap');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const btnInterest = document.querySelector('.btnInterest');
const btnMy = document.querySelector('.btnMy');
const myId = '198187803@N02';
const key = 'ddb99acf82f717f3bbb19edfc6b1d7e2';
const num = 50;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const method_search = 'flickr.photos.search';
const baseURL = `https://www.flickr.com/services/rest/?per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&method=`;
const interest_url = `${baseURL}${method_interest}`;
const my_url = `${baseURL}${method_user}&user_id=${myId}`;
const search_url = `${baseURL}${method_search}&tags=landscape`;

fetchData(interest_url);

btnSearch.addEventListener('click', e => {
    e.preventDefault();
    const value = input.value.trim();
    input.value='';
    if(value === '') return alert('검색어를 입력하세요.');

	loading.classList.remove('off');
	wrap.classList.remove('on');
	
	const url = `${baseURL}${method_search}&tags=${value}`;
	fetchData(url);
});

btnMy.addEventListener('click', ()=> {
    loading.classList.remove('off');
	wrap.classList.remove('on');
    fetchData(my_url)
});
btnInterest.addEventListener('click', ()=> {
    loading.classList.remove('off');
	wrap.classList.remove('on');
    fetchData(interest_url)
});

wrap.addEventListener('click',e => {
    if(e.target.className === 'userid') {
        const userId = e.target.innerText;
        const user_url = `${baseURL}${method_user}&user_id=${userId}`;
        loading.classList.remove('off');
        wrap.classList.remove('on');
        fetchData(user_url);
    }
})

async function fetchData(url) {
	const response = await fetch(url);
	const json = await response.json();
	createList(json.photos.photo);
	setLoading();
}

function createList(arr) {
	let tags = '';
	arr.forEach((item) => {
		tags += `
				<li class='item'>
					<div>
						<a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
							<img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
						</a>	
						<p>${item.title}</p>	
						
						<article class='profile'>
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />
							<span class="userid">${item.owner}</span>
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
			console.log(count);
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	console.log('모든 이미지 로딩완료 후 isoLayout적용');
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}