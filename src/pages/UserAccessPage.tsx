import React, { useState } from 'react';
import { useSongStore } from '../store/songStore';

interface UserAccessPageProps {
  setCurrentPage: (page: string) => void;
}

export const UserAccessPage: React.FC<UserAccessPageProps> = ({ setCurrentPage }) => {
  const [accessCode, setAccessCode] = useState('');
  const { findSongByCode, setCurrentSong } = useSongStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const song = findSongByCode(accessCode);
    
    if (song) {
      setCurrentSong(song);
      setCurrentPage('song-viewer');
    } else {
      alert('Invalid access code. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Access Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
            Enter 5-digit Code
          </label>
          <input
            id="accessCode"
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            placeholder="Enter 5-digit code"
            maxLength={5}
            pattern="[0-9]{5}"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};