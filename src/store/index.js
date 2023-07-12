import { configureStore } from "@reduxjs/toolkit";

import stateSlice from "./stateSlice";

const store = configureStore({
    reducer: {country: stateSlice.reducer}
})

export default store;