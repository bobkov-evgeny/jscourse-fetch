"use strict";
// Задание 1

const allUsers = fetch("http://jsonplaceholder.typicode.com/users", {
	method: `GET`,
});
const dataContainer = document.querySelector("#data-container");

const createElement = (data) => {
	const elementHTML = document.createElement("li");
	const elementAnchor = document.createElement("a");
	elementAnchor.href = "#";
	elementAnchor.textContent = `${data.name}`;
	elementHTML.append(elementAnchor);
	return elementHTML;
};

function toggleLoader() {
	const loader = dataContainer.querySelector("#loader");
	loader.classList.toggle("hidden");
}

function start() {
	toggleLoader();

	allUsers
		.then((response) => response.json())
		.then((users) =>
			users.forEach((user) => dataContainer.append(createElement(user)))
		)
		.catch((err) => console.error(err))
		.finally(() => toggleLoader());
}

start();
