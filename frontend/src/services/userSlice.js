import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state,action) => {
            state.user = action.payload
        },
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        },
        updateUser: (state, action) => {},
        removeUser: (state,action) => {}
    }
})

export const {addUser, loginUser, logoutUser, removeUser, updateUser} = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer