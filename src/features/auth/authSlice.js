import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { encryptUser } from "utils/EncryptedUser";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, remember: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, remember } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.remember = remember;

      // Persist token in storage
      if (remember === true) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("user", encryptUser(user));
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove('jwt');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
