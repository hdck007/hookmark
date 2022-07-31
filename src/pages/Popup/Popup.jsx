import React from 'react';
import { useEffect } from 'react';
import baseUrl from '../Content/modules/constants';
import './Popup.css';

const ImportComponent = () => {
  const [id, setId] = React.useState('');
  const [idToImport, setIdToImport] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleImport = () => {
    chrome.storage.local.set(
      {
        uuid: idToImport,
      },
      () => {
        setSuccess(true);
      }
    );
  };

  const handleGetId = (e) => {
    chrome.storage.local.get(['uuid'], (result) => {
      setId(result.uuid);
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
        onClick={handleGetId}
      >
        Get my id!
      </button>
      {!!id && (
        <p>
          Your id is: <span style={{ color: '#00bcd4' }}>{id}</span>
        </p>
      )}
      <hr />
      <input
        name="id"
        type="text"
        placeholder="Enter your id"
        value={idToImport}
        onChange={(e) => setIdToImport(e.target.value)}
        style={{
          width: '90%',
          margin: '10px',
          borderRadius: '50px 50px 0 0',
          padding: '10px',
          border: 'none',
          outline: 'none',
          borderBottom: '1px solid #00bcd4',
        }}
      />
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
        onClick={handleImport}
      >
        Import
      </button>
      <br />
      <br />
      {success && (
        <p
          style={{
            width: '90%',
            margin: 'auto',
          }}
        >
          Success! Your id has been imported. You can now use it to hook
        </p>
      )}
    </div>
  );
};

const HookComponent = ({ uuid }) => {
  const [hooks, setHooks] = React.useState([]);
  const [_, refetch] = React.useState(0);

  useEffect(() => {
    if (uuid) {
      fetch(`${baseUrl}/hookmark/${uuid}`)
        .then((res) => res.json())
        .then((data) => {
          setHooks(data);
        });
    }
  }, [_, uuid]);

  const handleHookClick = (hook) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: 'travel', payload: hook },
        () => {
          refetch((prev) => prev + 1);
        }
      );
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
      {!!hooks.length &&
        hooks.map((hook) => (
          <div
            style={{
              width: '90%',
              cursor: 'pointer',
            }}
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
        ))}
    </div>
  );
};

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
