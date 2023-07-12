import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "country",
    initialState: {states : [], cities: []},
    reducers:{
        fetchStates(state, action){
            state.states = action.payload.addStates
        },
        fetchCities(state, action){
            state.cities = action.payload.addCities
        }
    }
})



export const stateActions = stateSlice.actions;
export default stateSlice;