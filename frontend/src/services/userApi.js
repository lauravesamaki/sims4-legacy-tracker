import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://127.0.0.1:5000',
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/token/remove',
                method: 'POST'
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useAddUserMutation, useLoginUserMutation, useLogoutUserMutation } = userApi