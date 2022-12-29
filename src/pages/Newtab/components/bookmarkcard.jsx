import React from 'react';
import useCustomFetch from '../hooks/useCustomFetch';

const BookmarkCard = ({ title, baseuri }) => {
  const { data, error, loading } = useCustomFetch(
    `https://og-scraper-three.vercel.app/api?url=${baseuri}`
  );

  return (
    <div className="w-[350px] sm:w-[48%] md:w-[31%]">
      <div className="h-[300px] bg-neutral-800 shadow-none border border-neutral-800 hover:border-purple-700 rounded-lg p-4">
        <div className="h-[190px] md:h-[170px] mb-4">
          {loading ? (
            <div className="h-full w-full animate-pulse bg-stone-200"></div>
          ) : data.ogImage?.url ? (
            <img
              src={data?.ogImage?.url}
              className="w-2/3 h-full aspect-auto m-auto"
              alt="Open Graph logo of the website"
            />
          ) : (
            <img
              src="https://via.placeholder.com/350x150"
              alt="placeholder since no relevant detail was found"
            />
          )}
        </div>
        <h4 className="text-stone-200">
          {title.split('').slice(0, 51).join('')}...
        </h4>
        <p className="truncate">
          <a href={baseuri} rel="noreferrer" target="_blank">
            <span className="text-purple-300">{baseuri}</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookmarkCard;
