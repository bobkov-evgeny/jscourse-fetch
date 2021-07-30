"use strict";

const dataContainer = document.querySelector("#data-container");

function toggleLoader() {
	const loader = dataContainer.querySelector("#loader");
	loader.classList.toggle("hidden");
}

function createMarkUp(data) {
	return `
    <li class="photo-item">
        <img
            class="photo-item__image"
            src="${data.url}"
        />
        <h3 class="photo-item__title">
            ${data.title}
        </h3>
    </li>`;
}

function getFastestLoadedPhoto(ids) {
	const result = ids.map((id) =>
		fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
	);

	Promise.race(result)
		.then((response) => response.json())
		.then((response) =>
			dataContainer.insertAdjacentHTML("afterbegin", createMarkUp(response))
		)
		.catch((err) => console.error(err));
}

getFastestLoadedPhoto([60, 12, 55]);
