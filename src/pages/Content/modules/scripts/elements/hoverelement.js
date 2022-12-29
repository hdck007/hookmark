export default function createHoverElement(element) {
  const hoverElement = document.createElement('div');
  hoverElement.style.position = 'absolute';
  hoverElement.style.bottom = '105%';
  hoverElement.style.left = '0';
  hoverElement.style.width = 400 + 'px';
  hoverElement.style.zIndex = 10000;
  hoverElement.style.borderRadius = '5px';
  hoverElement.style.backgroundColor = 'red';
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
      <p>${
        element.averageRating
          ? 'Ratings: ' + element.averageRating + '/5'
          : 'No ratings'
      }</p>
      ${
        element?.comments?.length
          ? '<p class="most-liked">Most liked comment</p>'
          : ''
      }
      <p>${
        element?.comments?.length ? element.comments[0].data : 'No comments'
      }</p>
    </div>
  `;
  return hoverElement;
}
