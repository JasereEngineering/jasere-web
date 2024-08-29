import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AuthState } from "../../../types";
import request from "../../../helpers/request";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  id: null,
  loading: false
};

export const signup = createAsyncThunk(
  "auth/signup",
  async ({
    onSuccess,
    ...body
  }: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    onSuccess?: () => void;
  }) => {
    return await request({
      url: "/auth/register",
      method: "post",
      body,
      onSuccess,
    });
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({
    onSuccess,
    ...body
  }: {
    username: string;
    password: string;
    onSuccess?: () => void;
  }) => {
    return await request({
      url: "/auth/login",
      method: "post",
      body,
      onSuccess,
    });
  }
);

// export const signout = createAsyncThunk(
//   "auth/signout",
//   async (user: UserType) => {
//     return await request({
//       url: "/auth/logout",
//       method: "post",
//       user,
//     });
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    addGuest: (state, { payload }) => {
      state.username = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction("auth"), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction("auth"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("auth"), (state, action) => {
        switch (action.type) {
          case "auth/signin/fulfilled":
          case "auth/signup/fulfilled":
            state.firstName = action.payload.result.first_name;
            state.lastName = action.payload.result.last_name;
            state.username = action.payload.result.username;
            state.email = action.payload.result.email;
            state.id = action.payload.result.user_id;

            localStorage.setItem(
              "tokens",
              JSON.stringify({
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
              })
            );
            break;
        }

        state.loading = false;
      });
  },
});

export const { logout, addGuest } = authSlice.actions;

export default authSlice.reducer;
