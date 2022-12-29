export default function createRecommenderModal(recommenderString) {
  const recommender = document.createElement('div');
  recommender.innerHTML = recommenderString;
  recommender.style.position = 'absolute';
  recommender.style.padding = '10px';
  recommender.style.backgroundColor = 'black';
  recommender.style.top = '20%';
  recommender.style.right = '0';
  recommender.id = 'recommender-42';
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
  return recommender;
}
