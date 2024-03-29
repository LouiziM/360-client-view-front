import { createSlice } from "@reduxjs/toolkit";

// Load token from storage on application start
const storedToken = localStorage.getItem("authToken");

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: storedToken || null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken ,remember} = action.payload;
      state.user = user;
      state.token = accessToken;
      
      // Persist token in storage
      if(remember===true){
              localStorage.setItem("authToken", accessToken);
      }
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;

      // Remove token from storage on logout
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
