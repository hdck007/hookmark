import React from 'react';
import { render } from 'react-dom';
import Swal from 'sweetalert2';
import baseUrl from './modules/constants';
import Root from './modules/Root';

let USER_UUID = '';

function getAndUpdateUrlData() {
  const elements = document.querySelectorAll('a h3');
  const myRecommender = [];
  const style = document.createElement('style');
  style.innerHTML = `
  .UK95Uc{
    contain: none !important;
    overflow: inherit !important;
  }
  .star-bright{
    color: #ffb400;
  }`;
  document.body.appendChild(style);
  const urls = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i].parentElement;
    const url = element.getAttribute('href');
    const currrentUrl = new URL(window.location.href);
    console.log(elements[i].innerText);
    if (url) {
      const urlObject = new URL(url);
      urls.push({
        url: url.replace(urlObject.hash, ''),
        key: currrentUrl.searchParams.get('q'),
      });
    }
  }
  fetch(`${baseUrl}/website/`, {
    method: 'POST',
    body: JSON.stringify({
      websites: urls,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element, index) => {
        const hoverElement = document.createElement('div');
        hoverElement.style.position = 'absolute';
        hoverElement.style.bottom = '105%';
        hoverElement.style.left = '0';
        hoverElement.style.width = 400 + 'px';
        hoverElement.style.zIndex = 10000;
        hoverElement.style.borderRadius = '5px';
        hoverElement.style.backgroundColor = 'red';
        // hoverElement.style.display = 'none';
        hoverElement.innerHTML = `
          <style>
          .most-liked{
            font-size: 16px;
            font-weight: bold;
          }
            .hover-element-ext-42{
              font-size: 14px;
              z-index: 9999;
              border-radius: 5px;
              color: #fff;
              padding: 10px;
              background: black;
              pointer-events: none;
              position: absolute;
              bottom: 100%;
              left: 0;
            }
          </style>
          <div class="hover-element-ext-42">
            <p>${element.averageRating
            ? 'Ratings: ' + element.averageRating + '/5'
            : 'No ratings'
          }</p>
            ${element?.comments?.length
            ? '<p class="most-liked">Most liked comment</p>'
            : ''
          }
            <p>${element?.comments?.length
            ? element.comments[0].data
            : 'No comments'
          }</p>
          </div>
        `;
        const currentRecommendation = {
          ...element,
          title: elements[index].innerText,
        };
        myRecommender.push(currentRecommendation);
        elements[index].parentElement.setAttribute(
          'data-link',
          elements[index].innerText
        );
        elements[index].parentElement.style.position = 'relative !important';
        elements[index].addEventListener('mouseenter', (e) => {
          if (!e.target.parentElement.contains(hoverElement)) {
            e.target.parentElement.appendChild(hoverElement);
          }
        });
        elements[index].addEventListener('mouseleave', (e) => {
          if (e.target.parentElement.contains(hoverElement)) {
            e.target.parentElement.removeChild(hoverElement);
          }
        });
      });
      myRecommender.sort((a, b) => {
        return Number(b.averageRating) - Number(a.averageRating);
      });
      let recommenderString = '';
      myRecommender.forEach((currentstate) => {
        recommenderString =
          recommenderString +
          `
              <div class="recommender-element">
                <a href="${currentstate.url}">
                  <p>${currentstate.title
            .replace('<', '&#60;')
            .replace('>', '&#62;')}</p>
                  <p class="recommender-rating" >${currentstate.averageRating
            ? 'Ratings: ' + currentstate.averageRating + '/5'
            : 'No ratings'
          }</p>
                </a>
              </div>
            `;
      });
      const recommender = document.createElement('div');
      recommender.innerHTML = recommenderString;
      console.log(recommenderString);
      recommender.style.position = 'absolute';
      // recommender.style.zIndex = 10000;
      recommender.style.backgroundColor = 'transparent';
      recommender.style.top = '20%';
      recommender.style.right = '0';
      recommender.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          const element = document.querySelector(
            `[data-link="${e.target.innerText}"]`
          );
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } catch (error) {
          console.error(error);
        }
      });
      document.body.appendChild(recommender);
    });
}

const createTheReactInstance = (uuid) => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  render(<Root uuid={uuid} />, root);
};

if (window.location.href.includes('google.com')) {
  console.log('This runs');
  getAndUpdateUrlData();
} else {
  chrome.storage.local.get(['uuid'], (result) => {
    if (JSON.stringify(result) === '{}') {
      fetch('https://www.uuidtools.com/api/generate/v1')
        .then((res) => res.json())
        .then((data) => {
          chrome.storage.local.set(
            {
              uuid: data[0],
            },
            () => {
              createTheReactInstance(data[0]);
            }
          );
        });
    } else {
      createTheReactInstance(result.uuid);
    }
  });
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  await chrome.storage.local.get(['uuid'], (result) => {
    USER_UUID = result.uuid;
  });
  console.log(USER_UUID);
  switch (message.type) {
    case 'createHook': {
      const selection = window.getSelection();
      if (selection.focusNode && USER_UUID) {
        const element = selection.focusNode.parentElement;
        const title = element.innerText;
        const baseuri = element.baseURI;
        const id = selection.focusNode.parentElement.getAttribute('id')
        const classAttr = selection.focusNode.parentElement.getAttribute('class')
        if (id) {
          fetch(`${baseUrl}/hookmark/add`, {
            method: 'POST',
            body: JSON.stringify({
              title,
              user: USER_UUID,
              attributeName: 'id',
              attributeValue: id,
              baseuri,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                title: 'Hook created',
                text: 'You can now use this hook in extension',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
            });
        } else if (classAttr) {
          fetch(`${baseUrl}/hookmark/add`, {
            method: 'POST',
            body: JSON.stringify({
              title,
              user: USER_UUID,
              attributeName: 'class',
              attributeValue: classAttr,
              baseuri,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                title: 'Hook created',
                text: 'You can now use this hook in extension',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
            });
        } else {
          fetch(`${baseUrl}/hookmark/add`, {
            method: 'POST',
            body: JSON.stringify({
              title,
              user: USER_UUID,
              baseuri,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                title: 'Hook created',
                text: 'You can now use this hook in extension',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
            });
        }
      }
      sendResponse('success');
      break;
    }
    case 'travel': {
      window.location.href = message.payload.baseuri;
      break;
    }
    default:
      break;
  }
});
