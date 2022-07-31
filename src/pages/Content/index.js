import Swal from 'sweetalert2';
import baseUrl from './modules/constants';
import createTheReactInstance from './modules/scripts/createReactInstance';
import getAndUpdateUrlData from './modules/scripts/getAndUpdateUrlData';

let USER_UUID = '';

if (window.location.href.includes('google.com')) {
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
