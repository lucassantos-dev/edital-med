import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}
