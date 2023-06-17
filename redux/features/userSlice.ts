import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  value : {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    isSubmitted: boolean;
  }
};


const initialState = {
    value : {
      email : 'prueba@uc.cl',
      firstName: 'Juan',
      lastName: 'Perez',
      username: 'juanperez',
      isSubmitted: false
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
    // // Special reducer for hydrating the state
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
;