"use strict";

const URL_POSTS = "https://jsonplaceholder.typicode.com/posts/";
const URL_COMMENTS = "https://jsonplaceholder.typicode.com/comments?postId=";
const container = document.querySelector(".dataTest");

function createPostMarkUp(postData, commentsData) {
	const markUpStart = `
    <div id="post" class="post">
        <h1 class="post__title">${postData.title}</h1>
        <p class="post__text">${postData.body}</p>
        <b class="post__comments-text">Комментарии</b>
        <div class="post__comments">`;
	const markUpPosts = [];
	const markUpEnD = `
        </div>
    </div>`;

	commentsData.forEach((comment) =>
		markUpPosts.push(createCommentsMarkUp(comment))
	);

	return `${markUpStart}${markUpPosts}${markUpEnD}`;
}

function createCommentsMarkUp(commentsData) {
	return `<div class="post-comment">
            <span class="post-comment__author">
                ${commentsData.email}
            </span>
            <span class="post-comment__text">
                ${commentsData.body}
            </span>
        </div>`;
}

async function renderPost(postId) {
	const getPost = await (await fetch(`${URL_POSTS}${postId}`)).json();
	const getComments = await (await fetch(`${URL_COMMENTS}${postId}`)).json();
	const postMarkUp = createPostMarkUp(getPost, getComments);

	container.insertAdjacentHTML("beforeend", postMarkUp);
}

renderPost(3);
