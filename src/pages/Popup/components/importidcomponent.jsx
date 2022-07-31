import React from 'react';

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

export default ImportComponent;
