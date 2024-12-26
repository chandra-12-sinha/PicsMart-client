import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice"
import appConfigReducer from "./slices/appConfigs"

export default configureStore({
    reducer:{
        appConfigReducer,
        postsReducer
    }

})