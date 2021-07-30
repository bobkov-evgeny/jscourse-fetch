"use strict";
const dataContainer = document.querySelector("#data-container");

function toggleLoader() {
	const loader = dataContainer.querySelector("#loader");
	loader.classList.toggle("hidden");
}

const createElement = (data) => {
	const elementHTML = document.createElement("li");
	const elementAnchor = document.createElement("a");
	elementAnchor.href = "#";
	elementAnchor.textContent = `${data.name}`;
	elementHTML.append(elementAnchor);
	return elementHTML;
};

function getUsersById(arrOfIds) {
	toggleLoader();

	const results = arrOfIds.map((id) =>
		fetch(`http://jsonplaceholder.typicode.com/users/${id}`).then((response) =>
			response.json()
		)
	);

	Promise.all(results)
		.then((response) =>
			response.forEach((user) =>
				dataContainer.insertAdjacentElement("afterbegin", createElement(user))
			)
		)
		.catch((err) => console.error(err))
		.finally(() => toggleLoader());
}

getUsersById([5, 6, 2, 1]);
