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
    <div className="w-full flex flex-col items-center">
      <button
        className="w-[90%] m-1 mt-4 rounded-full py-2 text-center bg-purple-500 text-white cursor-pointer"
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
        className="w-[90%] m-1 my-4 rounded-full py-2 px-4 border-none outline-none bg-stone-800 text-white"
      />
      {showFiltered &&
        (!!filtered.length ? (
          filtered.map((hook) => (
            <div
              className="w-[90%] cursor-pointer"
              key={hook.baseuri}
              onClick={() => handleHookClick(hook)}
            >
              <p>
                <span className="text-purple-500 p-1 py-2 text-base overflow-hidden">
                  {hook.title}
                </span>
              </p>
            </div>
          ))
        ) : (
          <div className="w-[90%] cursor-pointer">
            <p>
              <span className="text-purple-500 p-1 py-2 text-base overflow-hidden">
                No results found for the query{' '}
                <span className="text-purple-300 font-bold">"{search}"</span>
              </span>
            </p>
          </div>
        ))}
      {!showFiltered &&
        (Boolean(hooks.length) ? (
          hooks.map((hook) => (
            <div
              className="w-[90%] cursor-pointer"
              key={hook.baseuri}
              onClick={() => handleHookClick(hook)}
            >
              <p className="text-purple-500 p-1 py-2 text-base overflow-hidden">
                {hook.title}
              </p>
            </div>
          ))
        ) : (
          <div className="w-[90%] cursor-pointer">
            <p>
              <span className="text-stone-400 p-1 py-2 text-base overflow-hidden">
                Ohh its empty hook to something now!
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default HookComponent;
