import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/userSlice";


//TUTORIAL: https://codevoweb.com/setup-redux-toolkit-in-nextjs-13-app-directory/
export const store = configureStore({
    reducer: {
      userReducer,
    },
    devTools: true,
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;