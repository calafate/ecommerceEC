import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:"",
    idToken:"",
    localId:"",
    name:"",
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser: (state,action) =>{
                state.email = action.payload.email
                state.idToken = action.payload.idToken
                state.localId = action.payload.localId
                state.name = action.payload.name
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer