import axiosClient from './api/axiosClient';
import axios from 'axios';
import postApi from './api/postApi';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { truncateText } from './utils';

dayjs.extend(relativeTime);

console.log('Hello from main.js');

// async function main() {
//   const queryParams = {
//     _page: 1,
//     _limit: 5,
//   };
//   const response = await postApi.getAllPost(queryParams);
//   console.log(response);
// }

function createPostElement(post) {
  if (!post) return;

  //find template
  const postTemplateElement = document.getElementById('postTemplate');
  console.log(postTemplateElement);
  if (!postTemplateElement) return;
  //clone template
  const liElement = postTemplateElement.content.firstElementChild.cloneNode(true);
  if (!liElement) return;
  //attach title to Dom
  const titleElement = liElement.querySelector('[data-id=title]');
  if (titleElement) titleElement.textContent = post.title;
  //attach description to Dom
  const descElement = liElement.querySelector('[data-id=description]');
  if (descElement) descElement.textContent = truncateText(post.description, 100);
  //attach author to Dom
  const authorElement = liElement.querySelector('[data-id=author]');
  if (authorElement) authorElement.textContent = post.author;
  //attach image to Dom
  const imageElement = liElement.querySelector('[data-id=thumbnail]');
  if (imageElement) {
    imageElement.src = post.imageUrl;

    imageElement.addEventListener('error', () => {
      imageElement.src = 'https://placehold.co/1400x800?text=Default+Image';
    });
  }
  // attach timespan
  const timeSpanElement = liElement.querySelector('[data-id=timeSpan]');
  if (timeSpanElement) timeSpanElement.textContent = `- ${dayjs(post.createdAt).fromNow()}`;
  return liElement;
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList === 0) return;
  console.log(postList);
  //find parent element
  const ulElement = document.getElementById('postList');
  // if (!ulElement) return;
  //loop through postList
  postList.forEach((post) => {
    //create li Element
    const liElement = createPostElement(post);
    console.log(liElement);
    // if (!liElement) return;
    //append it to parent element
    ulElement.appendChild(liElement);
  });
}

//MAIN
(async () => {
  const queryParams = {
    _page: 1,
    _limit: 5,
  };
  //get post with pagination
  try {
    const { data, pagination } = await postApi.getAllPost(queryParams);
    renderPostList(data);
  } catch (error) {
    console.log('get all posts failed', error);
  }
})();
