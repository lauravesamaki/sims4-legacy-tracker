import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";

const initialState = {
    relationshipsList: []
}

const relationshipSlice = createSlice({
    name: "relationships",
    initialState,
    reducers: {
        addRelationships: (state, action) => {
            const id = action.payload.sim
            const relationships = action.payload.relationships

            if (state.relationshipsList) {
                const sim = state.relationshipsList.find(oldSim => oldSim.id === id)

                if (sim) {
                    sim.relationships = relationships
                } else {
                    const newSim = {sim: id, relationships: relationships}
                    state.relationshipsList.push(...newSim)
                }
            } else {
                return [
                    {
                        sim: id,
                        relationships: relationships
                    }
                ]
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser, () => [])
    }
})

export const {addRelationships} = relationshipSlice.actions
export const selectRelationships = (state) => state.relationships
export default relationshipSlice.reducer