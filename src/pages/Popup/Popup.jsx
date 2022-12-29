import React from 'react';
import { useEffect } from 'react';
import HookComponent from './components/hookcomponent';
import ImportComponent from './components/importidcomponent';
import './Popup.css';
import SettingsComponent from '../Newtab/components/settings';

const Popup = () => {
  const [activeTab, setActiveTab] = React.useState('hook');
  const [uuid, setUuid] = React.useState('');

  useEffect(() => {
    chrome.storage.local.get(['uuid'], (result) => {
      setUuid(result.uuid);
    });
  }, []);

  return (
    <div className="bg-stone-900 w-screen min-h-screen">
      <div className="flex w-full">
        <div
          className={
            activeTab === 'hook'
              ? 'w-1/2 transition-all text-lg border-b-2 border-purple-700 text-center p-2 cursor-pointer text-purple-300'
              : 'w-1/2 transition-all text-lg border-b-2 border-stone-700 text-center p-2 cursor-pointer text-stone-300'
          }
          onClick={() => setActiveTab('hook')}
        >
          Hook
        </div>
        <div
          className={
            activeTab === 'hook'
              ? 'w-1/2 transition-all text-lg border-b-2 border-stone-700 text-center p-2 cursor-pointer text-stone-300'
              : 'w-1/2 transition-all text-lg border-b-2 border-purple-700 text-center p-2 cursor-pointer text-purple-300'
          }
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
      </div>
      {activeTab === 'hook' ? (
        <HookComponent uuid={uuid} />
      ) : (
        <SettingsComponent />
      )}
    </div>
  );
};

export default Popup;
