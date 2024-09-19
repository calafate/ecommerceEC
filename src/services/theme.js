import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_FIREBASE } from '../firebase/database'

export const themeApi = createApi({

    reducerPath:"themeApi",
    baseQuery:fetchBaseQuery({baseUrl:URL_FIREBASE}),
    

    endpoints:(builder) => ({
        
    })   
})

export const {  
} = themeApi