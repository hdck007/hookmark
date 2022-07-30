import React from 'react';
import { render } from 'react-dom';
import { printLine } from './modules/print';
import Root from './modules/Root';

function displayRating(rating) {
  let ratingString = `${rating}/5`;
  for (let i = 0; i < rating; i++) {
    ratingString += '<span class="star-bright">&#9733;</span>';
  }
  for (let i = 0; i < 5 - rating; i++) {
    ratingString += '<span class="star">&#9734;</span>';
  }
  return ratingString;
}

function getAndUpdateUrlData() {
  const elements = document.querySelectorAll('a h3');
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
    if (url) {
      const urlObject = new URL(url);
      urls.push({
        url: url.replace(urlObject.hash, ''),
        key: currrentUrl.searchParams.get('q'),
      });
    }
  }
  fetch('http://localhost:3000/website/', {
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
      console.log(data);
      data.forEach((element, index) => {
        const hoverElement = document.createElement('div');
        hoverElement.style.position = 'absolute';
        hoverElement.style.bottom = '130%';
        hoverElement.style.left = '0';
        hoverElement.style.width = 400 + 'px';
        hoverElement.style.zIndex = 100;
        hoverElement.style.backgroundColor = 'red';
        // hoverElement.style.display = 'none';
        hoverElement.innerHTML = `
          <style>
            .hover-element-ext-42{
              z-index: 9999;
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
            ? displayRating(elements.averageRating)
            : 'No ratings'
          }</p>
            <p>${element?.comments?.length
            ? element.comments[0].data
            : 'No comments'
          }</p>
          </div>
        `;
        // autoAnimate(elements[index].parentElement);
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
    });
}

const createTheReactInstance = (uuid) => {
  console.log("This doesn't run");
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

printLine("Using the 'printLine' function from the Print Module");
