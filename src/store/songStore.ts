import { create } from 'zustand';
import { Song } from '../types';

interface SongStore {
  songs: Song[];
  currentSong: Song | null;
  currentUser: string;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  findSongByCode: (code: string) => Song | null;
  setCurrentSong: (song: Song | null) => void;
  getUserSongs: () => Song[];
}

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  currentSong: null,
  // In a real app, this would come from authentication
  currentUser: 'user-' + Math.random().toString(36).substr(2, 9),
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  removeSong: (id) => set((state) => ({
    songs: state.songs.filter((song) => song.id !== id),
    currentSong: state.currentSong?.id === id ? null : state.currentSong,
  })),
  findSongByCode: (code) => {
    const { songs } = get();
    return songs.find((song) => song.accessCode === code) || null;
  },
  setCurrentSong: (song) => set({ currentSong: song }),
  getUserSongs: () => {
    const { songs, currentUser } = get();
    return songs.filter((song) => song.uploaderId === currentUser);
  },
}));