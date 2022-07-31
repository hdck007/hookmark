import baseUrl from "../constants";

export default function getAndUpdateUrlData() {
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
      recommender.style.position = 'absolute';
      recommender.style.padding = '10px';
      recommender.style.backgroundColor = 'black';
      recommender.style.top = '20%';
      recommender.style.right = '0';
      const button = document.createElement('button');
      button.innerText = 'Close';
      button.style.position = 'absolute';
      button.style.top = '15%';
      button.style.zIndex = 9999;
      button.style.right = '10px';
      button.style.backgroundColor = 'black';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.padding = '10px 20px';
      button.style.borderRadius = '500px';
      button.style.fontSize = '20px';
      button.addEventListener('click', (e) => {
        if (button.innerText === 'Close') {
          recommender.style.display = 'none';
          button.innerText = 'Open';
        } else {
          recommender.style.display = 'block';
          button.innerText = 'Close';
        }
      })
      document.body.appendChild(button);
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