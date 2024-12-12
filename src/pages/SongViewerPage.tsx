import React from 'react';
import { AudioPlayer } from '../components/AudioPlayer';
import { useSongStore } from '../store/songStore';

export const SongViewerPage: React.FC = () => {
  const currentSong = useSongStore((state) => state.currentSong);

  if (!currentSong) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No song selected. Please enter an access code to view a song.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{currentSong.title}</h2>
        <div className="bg-gray-50 p-4 rounded-md h-64 overflow-y-auto">
          <p className="whitespace-pre-line text-gray-800">{currentSong.lyrics}</p>
        </div>
      </div>
      <AudioPlayer audioSrc={currentSong.audioUrl} />
    </div>
  );
};