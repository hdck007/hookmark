import React from 'react';
import baseUrl from '../../Content/modules/constants';
import BookmarkCard from './bookmarkcard';
import { FullScreenClose, Search, X } from '@geist-ui/icons';

const GridView = ({ uuid }) => {
  const [hooks, setHooks] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [_, refetch] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

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

  const handleCancel = () => {
    setSearch('');
    setSearched(false);
    refetch((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      const filtered = await fetch(
        `${baseUrl}/hookmark/${uuid}/search?query=${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const hookMap = data.map((hook) => {
            return {
              ...hook,
              title: hook.title ? hook.title : hook.baseuri,
            };
          });
          return hookMap;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      setHooks(filtered);
      setSearched(true);
    } else {
      if (searched) {
        setSearched(false);
        refetch((prev) => !prev);
      }
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="border-b-2 w-full p-4 border-stone-700 text-stone-100 flex items-center "
      >
        <input
          type="text"
          className="w-full bg-stone-800 text-stone-100 p-2 px-4 rounded-full outline-none border-2 border-stone-900 focus:border-2 focus:border-purple-500"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {searched ? (
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-2 text-stone-100 bg-purple-500 rounded-full ml-4"
          >
            <X />
          </button>
        ) : (
          <button
            type="submit"
            className="px-8 py-2 text-stone-100 bg-purple-500 rounded-full ml-4"
          >
            <Search />
          </button>
        )}
      </form>
      <div className="flex flex-wrap justify-around m-auto gap-4 p-4">
        {searched && hooks?.length === 0 && (
          <div className="w-full text-center text-stone-300">
            <p className="text-2xl">Search didn't yield any result</p>
          </div>
        )}
        {!searched && hooks?.length === 0 && (
          <div className="w-full text-center text-stone-300">
            <p className="text-2xl">No hooks created</p>
          </div>
        )}
        {hooks?.length &&
          hooks.map((item, index) => <BookmarkCard key={item.id} {...item} />)}
        {new Array(3 - (hooks.length % 3)).fill(0).map((_, index) => (
          <div className="w-[350px] sm:w-[48%] md:w-[31%]"></div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
