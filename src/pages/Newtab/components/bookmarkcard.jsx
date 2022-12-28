import React from 'react';
import { Card, Grid, Image, Link, Text } from '@geist-ui/core';
import { useEffect } from 'react';
import useCustomFetch from '../hooks/useCustomFetch';

const BookmarkCard = ({ title, baseuri }) => {
  const { data, error, loading } = useCustomFetch(
    `https://og-scraper-three.vercel.app/api?url=${baseuri}`
  );

  return (
    <div className="w-[350px] sm:w-[48%] md:w-[31%]">
      <div className="h-[300px] lg:h-[280px] bg-neutral-800 shadow-none border border-neutral-800 hover:border-purple-700 rounded-lg p-4">
        <div className=" h-[180px] mb-4">
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
        <h5 className="text-stone-200">
          {title.split('').slice(0, 41).join('')}...
        </h5>
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
