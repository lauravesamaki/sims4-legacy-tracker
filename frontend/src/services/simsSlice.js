import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";

const initialState = {
    simsList: []
}

const simSlice = createSlice({
    name: "sims",
    initialState,
    reducers: {
        addSim: (state, action) => {
            const payload = Array.isArray(action.payload) 
                ? action.payload 
                : Array.isArray(action.payload?.data) 
                    ? action.payload.data
                    : []
            
            if (state.simsList) {
                const newSims = payload.filter(
                    newSim => !state.simsList.some(oldSim => oldSim.id === newSim.id)
                )
                state.simsList.push(...newSims)
            } else {
                return payload
            }
        },
        removeSim: (state, action) => {
            state.simsList.filter(action.payload)
        },
        updateSim: (state, action) => {

        },
        emptySims: (state) => {
            state.simsList = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser, () => [])
    }
})

export const {addSim, removeSim, updateSim, emptySims} = simSlice.actions
export const selectSims = (state) => state.sims
export default simSlice.reducer