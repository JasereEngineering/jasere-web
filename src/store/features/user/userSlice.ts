import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { UserState } from "../../../types";
import request from "../../../helpers/request";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: UserState = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  id: null,
  userId: null,
  loading: false,
  isActive: false,
};

export const fetchProfile = createAsyncThunk(
  "user/profile",
  async (_, { getState }) => {
    const {
      auth: { id },
    } = getState() as RootState;

    return await request({
      url: `/user/${id}`,
      method: "get",
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction("user"), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction("user"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("user"), (state, action) => {
        switch (action.type) {
          case "user/profile/fulfilled":
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.userId = action.payload.user_id;
            state.id = action.payload.id;
            state.isActive = action.payload.isActive;
            break;
        }

        state.loading = false;
      });
  },
});

export default userSlice.reducer;
