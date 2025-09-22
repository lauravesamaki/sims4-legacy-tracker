import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const simsApi = createApi({
    reducerPath: 'simsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://127.0.0.1:5000',
        credentials: 'include'
    }),
    tagTypes: ['Sims'],
    endpoints: (builder) => ({
        getSims: builder.query({
            query: (username) => ({
                url: `/user/${username}/sims`,
                method: 'GET'
            }),
            providesTags: ['Sims']
        }),
        addSim: builder.mutation({
            query: ({username, newSim}) => ({
                url: `/user/${username}/add_sim`,
                method: 'POST',
                body: newSim,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Sims']
        }),
        editSim: builder.mutation({
            query: ({id, sim}) => ({
                url: `/sim/${id}`,
                method: 'PATCH',
                body: sim,
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Sims']
        }),
        deleteSim: builder.mutation({
            query: (id) => ({
                url: `/sim/${id}`,
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': sessionStorage.getItem('csrf')
                }
            }),
            invalidatesTags: ['Sims']
        })
    })
})

export const { useGetSimsQuery, useAddSimMutation, useEditSimMutation, useDeleteSimMutation } = simsApi