const wrap = document.querySelector('.wrap');

fetchYoutube();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

//데이터 fetching함수
async function fetchYoutube() {
	const key = 'AIzaSyDSCWORElzze8oFzl62jVAm0zLOr6uJGjA';
	const list = 'PLGOVj4gmzJyDZ4VkTTHeQFBnJzNPCjxYJ';
	const num = 10;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const url = `${baseURL}?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;
	const data = await fetch(url);
	const json = await data.json();

	createlist(json.items);
}

//동적 목록 생성함수
function createlist(arr) {
	let tags = '';

	arr.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;

		tags += `
      <article>
        <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
        <div class='txt'>
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
        </div>
        <div class='pic'>
          <img src=${item.snippet.thumbnails.standard.url} alt=${item.snippet.resourceId.videoId} class='thumb' />
        </div>
      </article>
    `;
	});

	wrap.innerHTML = tags;
}

//동적 팝업 생성함수
function createPop(id) {
	const tags = `   
      <div class='con'>
        <iframe src='https://www.youtube.com/embed/${id}'></iframe>
      </div>
      <span class='close'>close</span>
  `;
	const pop = document.createElement('aside');
	pop.className = 'modal';
	pop.innerHTML = tags;

	document.body.append(pop);
	setTimeout(() => document.querySelector('.modal').classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

//동적 팝업 제거함수
function removePop() {
	document.querySelector('.modal').classList.remove('on');
	setTimeout(() => document.querySelector('.modal').remove(), 1000);
	document.body.style.overflow = 'auto';
}
