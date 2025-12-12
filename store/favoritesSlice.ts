import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const petId = action.payload;
      if (!state.favoriteIds.includes(petId)) {
        state.favoriteIds.push(petId);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const petId = action.payload;
      state.favoriteIds = state.favoriteIds.filter((id) => id !== petId);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const petId = action.payload;
      const index = state.favoriteIds.indexOf(petId);
      if (index === -1) {
        state.favoriteIds.push(petId);
      } else {
        state.favoriteIds.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectFavoriteIds = (state: { favorites: FavoritesState }) =>
  state.favorites.favoriteIds;

export const selectIsFavorite = (state: { favorites: FavoritesState }, petId: string) =>
  state.favorites.favoriteIds.includes(petId);

