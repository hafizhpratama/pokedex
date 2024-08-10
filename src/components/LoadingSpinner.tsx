import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="relative w-24 h-24">
      <div className="w-full h-full rounded-full bg-red-600 relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-white border-4 border-black"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-full bg-red-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full bg-white border-t-4 border-black"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-8 h-8 rounded-full bg-black"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center animate-spin">
        <div className="w-24 h-24 border-4 border-red-600 border-t-transparent border-solid rounded-full"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
