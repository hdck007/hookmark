chrome.storage.local.get(['uuid'], (result) => {
  if (JSON.stringify(result) === '{}') {
    fetch('https://www.uuidtools.com/api/generate/v1')
      .then((res) => res.json())
      .then((data) => {
        chrome.storage.local.set(
          {
            uuid: data[0],
          },
          () => { }
        );
      });
  }
});
