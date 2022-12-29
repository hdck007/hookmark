import React from 'react';

const SettingsComponent = () => {
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
    if (!!id) {
      setId('');
      return;
    }
    chrome.storage.local.get(['uuid'], (result) => {
      setId(result.uuid);
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        className="w-[90%] m-1 rounded-full p-1 py-2 text-center border-none mt-10 bg-purple-500 text-white cursor-pointer"
        onClick={handleGetId}
      >
        {!!id ? 'Hide the id' : 'Get my id!'}
      </button>
      {!!id && (
        <p className="w-[90%] my-2 text-stone-400">
          Your id is: <span className="text-purple-700">{id}</span>
        </p>
      )}
      <hr />
      <input
        name="id"
        type="text"
        placeholder="Enter your id"
        value={idToImport}
        onChange={(e) => setIdToImport(e.target.value)}
        className="w-[90%] m-1 mt-10 mb-4 text-stone-300 rounded-full py-2 px-4 border-none border-b-2 bg-stone-800 border-purple-500 outline-none"
      />
      <button
        className="w-[90%] m-1 rounded-full p-1 py-2 text-center border-none bg-purple-500 text-white cursor-pointer"
        onClick={handleImport}
      >
        Import
      </button>
      <br />
      <br />
      {success && (
        <p className="w-[90%] m-auto text-stone-400">
          Success! Your id has been imported. You can now use it to hook
        </p>
      )}
    </div>
  );
};

export default SettingsComponent;
