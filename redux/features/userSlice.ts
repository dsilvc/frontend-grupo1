import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  value : {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    isSubmitted: boolean;
    token: string;
  }
};


const initialState = {
    value : {
      email : '',
      firstName: 'Juan',
      lastName: 'Perez',
      username: 'juanperez',
      isSubmitted: false,
      token: '',
    }
} as userState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to add comment
    setUser: (state, action:  PayloadAction<any>) => {
      state.value = action.payload;
    },

    setToken: (state, action:  PayloadAction<any>) => {
      state.value.token = action.payload;
    },
    setEmail: (state, action:  PayloadAction<any>) => {
      state.value.email = action.payload;
    },
    // // Special reducer for hydrating the state
  },
});

export const { setUser, setToken, setEmail } = userSlice.actions;
export default userSlice.reducer;
;