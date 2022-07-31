import React from 'react';
import { useEffect } from 'react';
import HookComponent from './components/hookcomponent';
import ImportComponent from './components/importidcomponent';
import './Popup.css';

const Popup = () => {
  const [activeTab, setActiveTab] = React.useState('hook');
  const [uuid, setUuid] = React.useState('');

  useEffect(() => {
    chrome.storage.local.get(['uuid'], (result) => {
      setUuid(result.uuid);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '50%',
            fontSize: '18px',
            padding: '5px 0',
            cursor: 'pointer',
            textAlign: 'center',
            color: activeTab === 'hook' ? '#00bcd4' : '#000',
            borderBottom: '1px solid black',
          }}
          onClick={() => setActiveTab('hook')}
        >
          Hook
        </div>
        <div
          style={{
            width: '50%',
            textAlign: 'center',
            padding: '5px 0',
            cursor: 'pointer',
            fontSize: '18px',
            color: activeTab === 'settings' ? '#00bcd4' : '#000',
            borderBottom: '1px solid black',
          }}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
      </div>
      {activeTab === 'hook' ? (
        <HookComponent uuid={uuid} />
      ) : (
        <ImportComponent />
      )}
    </div>
  );
};

export default Popup;
