import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const treeApi = createApi({
    reducerPath: 'treeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000',
        credentials: 'include'
    }),
    tagTypes: ['Trees'],
    endpoints: (builder) => ({
        getTrees: builder.query({
            query: (username) => ({
                url: `/user/${username}/trees`,
                method: 'GET'
            }),
            providesTags: ['Trees']
        }),
        addTree: builder.mutation({
            query: (tree) => ({
                url: '/trees/add',
                method: 'POST',
                body: tree,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Trees']
        }),
        editTree: builder.mutation({
            query: ({id, tree}) => ({
                url: `/trees/${id}/edit`,
                method: 'PATCH',
                body: tree,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Trees']
        }),
        deleteTree: builder.mutation({
            query: (id) => ({
                url: `/trees/${id}`,
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Trees']
        })
    })
})

export const {
    useGetTreesQuery, 
    useAddTreeMutation, 
    useEditTreeMutation, 
    useDeleteTreeMutation } = treeApi