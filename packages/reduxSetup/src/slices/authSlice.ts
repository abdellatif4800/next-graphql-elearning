import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isModalOpend: boolean;
  isAuth: boolean;
  user: any
}

const initialState: AuthState = {
  isModalOpend: false,
  isAuth: false,
  user: null
}

export const authSlice = createSlice(
  {
    name: "auth",
    initialState,
    reducers: {
      toggleAuthModal: (state) => {
        state.isModalOpend = !state.isModalOpend
      },
      setAuthUser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.isAuth = true;

      },
      setUnAuthorized: (state) => {
        state.isAuth = false
      },
      logout: (state) => {
        state.user = null;
        state.isAuth = false;
      },
    }
  }
)

export const {
  toggleAuthModal, setAuthUser, logout, setUnAuthorized

} = authSlice.actions
export default authSlice.reducer
