import React from 'react';

export default function Greeting({ name = 'Guest', message = 'Welcome!' }) {
  return (
    <div className="p-4 bg-blue-100 rounded shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">Hello, {name}!</h2>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
}
