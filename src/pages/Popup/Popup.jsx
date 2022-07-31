import React from 'react';
import Collapsible from 'react-collapsible';
import Swal from 'sweetalert2';
import './Popup.css';

// a button to add the hookmark
// my hookmarks
// recommendations for each tag
const options = [
  { value: 'software-development', label: 'Software Development' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'art', label: 'Art' },
  { value: 'food', label: 'Food' },
  { value: 'travel', label: 'Travel' },
  { value: 'other', label: 'Other' },
];

const Popup = () => {
  const [activeTab, setActiveTab] = React.useState('hook');
  const [id, setId] = React.useState('');
  const [idToImport, setIdToImport] = React.useState('');

  const handleImport = () => {
    chrome.storage.local.set(
      {
        uuid: idToImport,
      },
      () => {
        Swal.fire({
          title: 'Success',
          text: 'Hookmark imported successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    );
  };

  const handleGetId = (e) => {
    chrome.storage.local.get(['uuid'], (result) => {
      setId(result.uuid);
    });
  };

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
          >
            Hook it!
          </button>
          {/* <div>
            <Collapsible trigger={'My hookmarks'}></Collapsible>
            {options.map((option) => (
              <Collapsible trigger={option.label}></Collapsible>
            ))}
          </div> */}
        </div>
      ) : (
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
              margin: '5px',
              borderRadius: '50px 50px 0 0',
              padding: '5px',
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
        </div>
      )}
    </div>
  );
};

export default Popup;
