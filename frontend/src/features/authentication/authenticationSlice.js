import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isauth: false,
    token: "",
    userInfo: {}
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isauth = action.payload.value
        },
        setRefreshToken: (state, action) => {
            state.token = action.payload.refreshToken
        },
        setUser: (state, action) => {
            state.token = action.payload.userInfo
        },

        setUserInfo : (state ,action) => {
            state.userInfo = action.payload.user
        }


    }
})

export const {setUserInfo,  setIsAuth, setRefreshToken } = authenticationSlice.actions

export default authenticationSlice.reducer