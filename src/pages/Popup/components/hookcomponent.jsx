import React from 'react';
import baseUrl from '../../Content/modules/constants';

const HookComponent = ({ uuid }) => {
  const [hooks, setHooks] = React.useState([]);
  const [_, refetch] = React.useState(0);
  const [filtered, setFiltered] = React.useState([]);
  const [showFiltered, setShowFiltered] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    if (uuid) {
      fetch(`${baseUrl}/hookmark/${uuid}`)
        .then((res) => res.json())
        .then((data) => {
          const hookMap = data.map((hook) => {
            return {
              ...hook,
              title: hook.title ? hook.title : hook.baseuri,
            };
          });
          setHooks(hookMap);
        });
    }
  }, [_, uuid]);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedStateSearch = React.useCallback(
    debounce((event) => {
      console.log(event.target.value);
      if (event.target.value.trim() === '') {
        setSearch('');
        setFiltered([]);
        setShowFiltered(false);
        return;
      }
      const newFiltered = hooks.filter((hook) => {
        return hook.title.includes(event.target.value.trim());
      });
      setSearch(event.target.value);
      setFiltered(newFiltered);
      setShowFiltered(true);
    }, 500),
    [hooks]
  );

  const handleHookClick = (hook) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.create({
        url: hook.baseuri,
        active: true,
      });
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
      <h1>Your saved hookmarks!</h1>
      <input
        name="id"
        type="text"
        placeholder="Search your bookmarks"
        onChange={debouncedStateSearch}
        style={{
          width: '85%',
          margin: '10px',
          borderRadius: '50px 50px 0 0',
          padding: '10px',
          border: 'none',
          outline: 'none',
          borderBottom: '1px solid #00bcd4',
        }}
      />
      {showFiltered &&
        (!!filtered.length ? (
          filtered.map((hook) => (
            <div
              style={{
                width: '90%',
                cursor: 'pointer',
              }}
              key={hook.baseuri}
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
          ))
        ) : (
          <div
            style={{
              width: '90%',
              cursor: 'pointer',
            }}
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
                No results found for the query{' '}
                <span
                  style={{
                    color: 'black',
                  }}
                >
                  "{search}"
                </span>
              </span>
            </p>
          </div>
        ))}
      {!showFiltered &&
        (Boolean(hooks.length) ? (
          hooks.map((hook) => (
            <div
              style={{
                width: '90%',
                cursor: 'pointer',
              }}
              key={hook.baseuri}
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
          ))
        ) : (
          <div
            style={{
              width: '90%',
              cursor: 'pointer',
            }}
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
                Ohh its empty hook to something now!
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default HookComponent;
