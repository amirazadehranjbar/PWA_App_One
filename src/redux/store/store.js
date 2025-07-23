import {configureStore} from "@reduxjs/toolkit";
import movieSlice from "../features/moviesSlice.js";

const store = configureStore({
    reducer:{
        movieSlice : movieSlice
    }
});

export default store;