import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  surname: null,
  profileImageUrl: null,
  photoResults: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    deleteUser: state => {
      return initialState;
    },
    savePhotoResults: (state: any, action: any) => {
      return {
        ...state,
        photoResults: [...state.photoResults, action.payload]
      }
    }
  }
})

export const { saveUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
