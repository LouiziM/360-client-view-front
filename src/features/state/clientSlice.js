import { apiSlice } from "../../app/api/apiSlice";

export const clientSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllClients: builder.query({
      query: () => ({
        url: '/clients',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.map((client, index) => ({ ...client, id: index + 1 }));
      },
      providesTags: ['clients'],
    }),
    getCompletion: builder.query({
        query: (id) => ({
          url: `/clients/completion/${id}`, 
          method: 'GET',
        }),
        providesTags: ['completion'],
      }),
      
  }),
});

export const { useGetAllClientsQuery, useGetCompletionQuery } = clientSlice;
