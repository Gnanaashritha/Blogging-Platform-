import { create } from 'zustand';

interface FavouriteStore {
  favourites: string[]; // Array of blog IDs
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
}

export const useFavouritesStore = create<FavouriteStore>((set) => ({
  favourites: [],
  addFavourite: (id) =>
    set((state) => ({
      favourites: [...state.favourites, id],
    })),
  removeFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.filter((favId) => favId !== id),
    })),
}));