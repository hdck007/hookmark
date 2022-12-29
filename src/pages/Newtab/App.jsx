import React from 'react';
import Sidebar from './components/sidebar';
import GridView from './components/gridview';

const Wrapper = () => {
  const [uuid, setUuid] = React.useState('');

  React.useEffect(() => {
    chrome.storage.local.get(['uuid'], (result) => {
      setUuid(result.uuid);
    });
  }, []);

  return (
    <div className="flex w-full">
      <div className=" hidden lg:block w-1/5 sticky top-0 h-screen border-r-2 border-stone-700">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5">
        <GridView uuid={uuid} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-stone-900 min-w-screen min-h-screen">
      <Wrapper />
    </div>
  );
}
