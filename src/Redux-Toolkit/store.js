import { configureStore } from "@reduxjs/toolkit";
import CoctailSlice from "./CoctailSlice/CoctailSlice";

const store=configureStore({
    reducer:{
        products:CoctailSlice
    }
})
export default store;