import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const relationshipsApi = createApi({
    reducerPath: 'relationshipsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000',
        credentials: 'include'
    }),
    tagTypes: ['Relationships'],
    endpoints: (builder) => ({
        addRelationship: builder.mutation({
            query: (relationship) => ({
                url: '/relationships/add',
                method: 'POST',
                body: relationship,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Relationships']
        }),
        editRelationship: builder.mutation({
            query: ({id, relationship}) => ({
                url: `/relationship/${id}/edit`,
                method: 'PATCH',
                body: relationship,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Relationships']
        }),
        deleteRelationship: builder.mutation({
            query: (id) => ({
                url: `/relationships/${id}`,
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Relationships']
        })
    })
})

export const { 
    useAddRelationshipMutation, 
    useEditRelationshipMutation, 
    useDeleteRelationshipMutation } = relationshipsApi