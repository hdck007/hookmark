export default function createButtonElement(onClick) {
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
  button.addEventListener('click', onClick);
  return button;
}
