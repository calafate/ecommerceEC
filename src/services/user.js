import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_FIREBASE } from '../firebase/database'


export const userApi = createApi({

    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:URL_FIREBASE}),
    tagTypes: ["User"],

    endpoints:(builder) => ({
        
        getUser: builder.query({
            query:({localId})=>`users/${localId}.json`,
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query:({user, localId})=> ({
                url:`users/${localId}.json`,
                method:"PATCH",
                body: user
            }),
            invalidatesTags: ['User'],
        }),
        patchImageProfile:builder.mutation({
            query:({image,localId})=> ({
                url:`users/${localId}.json`,
                method:"PATCH",
                body:{image}
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const {  useGetUserQuery,
                useUpdateUserMutation,
                usePatchImageProfileMutation,
} = userApi


