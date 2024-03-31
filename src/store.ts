import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./redux/authSlice.ts";

export const store = configureStore({
    reducer:{
        user: userReducer
    }
})

export type UserState = ReturnType<typeof store.getState>;
export type UserDispatch = typeof store.dispatch;