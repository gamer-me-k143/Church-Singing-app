import React, { useState, useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { useSongStore } from '../store/songStore';
import { generateAccessCode } from '../utils/helpers';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { validateAudioFile } from '../utils/fileUtils';

export const HomePage: React.FC = () => {
  const [songTitle, setSongTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const { addSong, removeSong, getUserSongs, currentUser } = useSongStore();
  
  const userSongs = getUserSongs();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await validateAudioFile(file);
      setAudioFile(file);
      setUploadError('');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Invalid audio file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!songTitle || !lyrics || !audioFile) {
      setUploadError('Please fill in all fields');
      return;
    }

    try {
      const code = generateAccessCode();
      setAccessCode(code);

      // Create a blob URL for the audio file
      const audioUrl = URL.createObjectURL(audioFile);

      addSong({
        id: Date.now().toString(),
        title: songTitle,
        lyrics,
        audioUrl,
        accessCode: code,
        uploaderId: currentUser,
        createdAt: Date.now(),
      });

      // Reset form
      setSongTitle('');
      setLyrics('');
      setAudioFile(null);
      setUploadError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadError('Error uploading song. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      removeSong(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Upload Song</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Song Title
            </label>
            <input
              id="songTitle"
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter song title"
              required
            />
          </div>
          <div>
            <label htmlFor="musicUpload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Music
            </label>
            <div className="flex items-center space-x-2">
              <Upload size={20} className="text-gray-400" />
              <input
                ref={fileInputRef}
                id="musicUpload"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="flex-grow"
                required
              />
            </div>
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}
          </div>
          <div>
            <label htmlFor="lyricsUpload" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Lyrics
            </label>
            <textarea
              id="lyricsUpload"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter lyrics"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Generate Code
          </button>
        </form>
      </div>

      {/* Rest of the component remains the same */}
      {userSongs.length > 0 && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Your Uploaded Songs</h3>
          <div className="space-y-4">
            {userSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
              >
                <div>
                  <h4 className="font-medium">{song.title}</h4>
                  <p className="text-sm text-gray-600">Access Code: {song.accessCode}</p>
                </div>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {accessCode && (
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-xl font-semibold mb-4">Generated Access Code</h3>
          <p className="text-center text-2xl font-bold">{accessCode}</p>
          <p className="text-center text-sm text-gray-600">
            Share this code with users to access the song.
          </p>
        </div>
      )}

      <ConfirmationDialog
        isOpen={!!deleteId}
        title="Delete Song"
        message="Are you sure you want to delete this song? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};