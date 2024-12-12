import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { UserAccessPage } from './pages/UserAccessPage';
import { SongViewerPage } from './pages/SongViewerPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'user-access':
        return <UserAccessPage setCurrentPage={setCurrentPage} />;
      case 'song-viewer':
        return <SongViewerPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto p-6">{renderPage()}</main>
    </div>
  );
}