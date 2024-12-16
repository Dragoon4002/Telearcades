import React, { useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true);

  return (
    <button
      className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
        isOn ? 'bg-purple-600' : 'bg-gray-200'
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      <span className="sr-only">Toggle gravity</span>
      <span
        className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleButton;
