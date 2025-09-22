import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trees: []
}

const treeSlice = createSlice({
    name: "trees",
    initialState,
    reducers: {
        addTree: (state, action) => {},
        updateTree: (state, action) => {},
        removeTree: (state,action) => {}
    }
})

export const {addTree, removeTree, updateTree} = treeSlice.actions
export default treeSlice.reducer