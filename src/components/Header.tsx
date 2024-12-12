import React from 'react';
import { Music } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Music className="text-gray-600" size={24} />
        <h1 className="text-xl font-semibold text-gray-800">Church Singing App</h1>
      </div>
      <nav className="flex space-x-2">
        {['home', 'user-access', 'song-viewer'].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-gray-200 text-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </nav>
    </div>
  </header>
);