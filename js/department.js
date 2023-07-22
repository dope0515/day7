const wrap = document.querySelector('.wrap');

async function fetchData() {
	try {
		const url = 'DB/department.json';
		const result = await fetch(url);
		const data = await result.json();

		let tags = '';

		data.members.forEach((item) => {
			tags += `
				<article>					
					<div class='pic'>
						<img src='img/${item.pic}' alt=${item.name} />
					</div>
					<h2>${item.name}</h2>
					<p>${item.position}</p>
				</article>
			`;
		});

		wrap.innerHTML = tags;
		
		console.log(tags);
	} catch (err) {
		console.log(err);
	}
}

fetchData();