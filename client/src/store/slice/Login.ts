import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  loginDetails: {};
  token: string | null;
};

const getLocalToken = localStorage.getItem('loginDetails');
let tokenData = null;
if (getLocalToken) {
  tokenData = JSON.parse(getLocalToken);
}

const initState: initStateType = {
  loginDetails: tokenData ? tokenData : {},
  token: tokenData ? tokenData.token : null,
};

const LoginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  reducers: {
    logoutHandler(state) {
      localStorage.removeItem('loginDetails');
      localStorage.removeItem('token');

      state.token = null;
      state.loginDetails = {};
    },
    logInHandler(state, action) {
      localStorage.setItem('loginDetails', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action?.payload?.token);

      state.token = action.payload.token;
      state.loginDetails = action.payload.user;
    },
  },
});
export const { logInHandler } = LoginSlice.actions;
export default LoginSlice.reducer;
