import Settings from '@geist-ui/icons/settings';
import React from 'react';
import SettingsComponent from './settings';

const Sidebar = () => {
  return (
    <div className="py-8 w-full inherit">
      <h4 className=" px-4 flex items-center text-stone-100 ">
        <Settings /> &nbsp; Settings
      </h4>
      <SettingsComponent />
    </div>
  );
};

export default Sidebar;
