import React from 'react';
import { Card, Grid, Image, Text } from '@geist-ui/core';
import baseUrl from '../../Content/modules/constants';
import BookmarkCard from './bookmarkcard';

const GridView = ({ uuid }) => {
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

  return (
    <div className="w-full">
      <h4 className="border-b-2 w-full px-4 py-2 border-stone-700 text-stone-100 ">
        Welcome!
      </h4>
      <div className="flex flex-wrap justify-around m-auto gap-4 px-4">
        {hooks.map((item, index) => (
          <BookmarkCard key={item.id} {...item} />
        ))}
        {new Array(3 - (hooks.length % 3)).fill(0).map((_, index) => (
          <div className="w-[350px] sm:w-[48%] md:w-[31%]"></div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
