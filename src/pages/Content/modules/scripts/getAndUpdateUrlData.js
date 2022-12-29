import baseUrl from '../constants';
import createHoverElement from './elements/hoverelement';
import createButtonElement from './elements/buttonelement';
import createRecommenderModal from './elements/recommendermodal';

function getRecommenderInnerHTML(recommenderArr) {
  recommenderArr.sort((a, b) => {
    return Number(b.averageRating) - Number(a.averageRating);
  });
  let recommenderString = '';
  recommenderArr.forEach((currentstate) => {
    recommenderString =
      recommenderString +
      `
          <div class="recommender-element">
            <a href="${currentstate.url}">
              <p id="recommender-text">${currentstate.title
                .replace('<', '&#60;')
                .replace('>', '&#62;')}</p>
              <p class="recommender-rating" >${
                currentstate.averageRating
                  ? 'Ratings: ' + currentstate.averageRating + '/5'
                  : 'No ratings'
              }</p>
            </a>
          </div>
        `;
  });
  return recommenderString;
}

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

  // extracating the url data to send in the request
  const urls = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i].parentElement;
    const url = element.getAttribute('href');
    console.log(window.location.href);
    const currrentUrl = new URL(window.location.href);
    if (url) {
      try {
        const urlObject = new URL(url);
        urls.push({
          url: url.replace(urlObject.hash, ''),
          key: currrentUrl.searchParams.get('q'),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  //----------------------------------------------

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
        const hoverElement = createHoverElement(element);
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

      const recommenderString = getRecommenderInnerHTML([...myRecommender]);
      const recommender = createRecommenderModal(recommenderString);

      // createButton(clickListener)
      const button = createButtonElement((e) => {
        if (button.innerText === 'Close') {
          recommender.style.display = 'none';
          button.innerText = 'Open';
        } else {
          recommender.style.display = 'block';
          button.innerText = 'Close';
        }
      });
      document.body.appendChild(button);
      document.body.appendChild(recommender);
    });
}
