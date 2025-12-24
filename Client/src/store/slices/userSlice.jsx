import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {}, 
  reducers: {
    userinfo(state, action) {
      return action.payload;
    },
    clearUser(state) {
      return {};
    },
    updateTheme(state, action) {
      if (state.userData && state.userData.user) {
        state.userData.user.theme = action.payload; // Update only theme
      }
    },
    // add update UserProfile
    updateUserProfile(state, action) {
      if (state.userData?. user) {
        return {
          ...state,
          userData: {
            ...state.userData,
            user: {
              ... state.userData.user,
              ...action.payload
            }
          }
        };
      }
      return state;
    },
  }
});

export const { userinfo, clearUser, updateTheme, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
