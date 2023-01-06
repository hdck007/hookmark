import React from 'react';
import baseUrl from '../../Content/modules/constants';
import BookmarkCard from './bookmarkcard';
import { Search, X } from '@geist-ui/icons';
import { useCallback } from 'react';

async function getList(pageNum, limit, uuid) {
  return await fetch(
    `${baseUrl}/hookmark/${uuid}?pageNum=${pageNum}&limit=${limit}`
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
    });
}

const GridView = ({ uuid }) => {
  const [hooks, setHooks] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [_, refetch] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const loader = React.useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log('visible');
      setPage((prev) => prev + 1);
    }
  }, []);

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  React.useEffect(() => {
    if (uuid) {
      getList(page, 10, uuid).then((data) => {
        if (data.length) {
          setHooks((prev) => [...prev, ...data]);
        } else {
          console.log('no more data');
          setLoading(false);
        }
      });
    }
  }, [_, uuid, page]);

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
          placeholder="Search your bookmarks"
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
      {loading && (
        <>
          <div className="w-full flex justify-center py-10 items-center">
            <span className="scale-150">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </span>
          </div>
          <div ref={loader} />
        </>
      )}
    </div>
  );
};

export default GridView;
