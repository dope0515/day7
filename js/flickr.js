const wrap = document.querySelector('wrap');
const num = 500;
const key = 'ddb99acf82f717f3bbb19edfc6b1d7e2';
const method_interest = 'flickr.interestingness.getList';
const baseURL = 'https://www.flickr.com/services/rest/?';
const url = `${baseURL}method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
const createImg = 'https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg';


fetch(url)
    .then(res=>{
    return res.json();
})
.then(json=>{
    console.log(json);
})
