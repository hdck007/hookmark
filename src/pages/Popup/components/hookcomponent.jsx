import React from 'react';
import baseUrl from '../../Content/modules/constants';

const HookComponent = ({ uuid }) => {
  const [hooks, setHooks] = React.useState([]);
  const [_, refetch] = React.useState(0);

  React.useEffect(() => {
    if (uuid) {
      fetch(`${baseUrl}/hookmark/${uuid}`)
        .then((res) => res.json())
        .then((data) => {
          setHooks(data);
        });
    }
  }, [_, uuid]);

  const handleHookClick = (hook) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: 'travel', payload: hook },
        () => {
          refetch((prev) => prev + 1);
        }
      );
    });
  };

  const handleHookIt = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'createHook' }, (value) => {
        if (value) {
          refetch((prev) => prev + 1);
        }
      });
    });
  };
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        style={{
          width: '90%',
          margin: '5px',
          borderRadius: '50px',
          padding: '5px',
          textAlign: 'center',
          border: 'none',
          backgroundColor: 'orange',
          color: 'white',
          cursor: 'pointer',
        }}
        onClick={handleHookIt}
      >
        Hook it!
      </button>
      {!!hooks.length &&
        hooks.map((hook) => (
          <div
            style={{
              width: '90%',
              cursor: 'pointer',
            }}
            onClick={() => handleHookClick(hook)}
          >
            <p>
              <span
                style={{
                  color: '#00bcd4',
                  padding: '5px 10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  fontSize: '16px',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {hook.title}
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default HookComponent;
