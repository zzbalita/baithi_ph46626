import { configureStore } from "@reduxjs/toolkit";
import baithiReducer from "../reducers/baithiReducer";

const store = configureStore({
    reducer:{
        baiThi: baithiReducer
    }
});

export default store;