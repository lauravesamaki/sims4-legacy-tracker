import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";

const initialState = {
    treeList: []
}

const treeSlice = createSlice({
    name: 'trees',
    initialState,
    reducers: {
        addTree: (state, action) => {
            const payload = Array.isArray(action.payload)
                ? action.payload
                : Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : []

            if (state.treeList) {
                const newTrees = payload.filter(
                    newTree => !state.treeList.some(oldTree => oldTree.id === newTree.id)
                )
                state.treeList.push(...newTrees)
            } else {
                return payload
            }
        },
        removeTree: (state, action) => {
            state.treeList.filter(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser, () => [])
    }
})

export const { addTree, removeTree } = treeSlice.actions
export const selectTrees = (state) => state.trees
export default treeSlice.reducer