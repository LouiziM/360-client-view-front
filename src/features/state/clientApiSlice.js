import { apiSlice } from "../../app/api/apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllClients: builder.query({
      query: ({ page, pageSize, searchTerm = '' }) => ({
        url: `/clients?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
        method: 'GET',
      }),
      providesTags: ['clients'],
    }),
    getCompletion: builder.query({
      query: (id) => ({
        url: `/clients/completion/${id}`,
        method: 'GET',
      }),
      providesTags: ['completion'],
    }),
    getParcClients: builder.query({
      query: (id) => ({
        url: `/clients/parc-client/${id}`,
        method: 'GET',
      }),
      providesTags: ['parc-client'],
    }),
    getPassageSAV: builder.query({
      query: (id) => ({
        url: `/clients/passage-sav/${id}`,
        method: 'GET',
      }),
      providesTags: ['passage-sav'],
    }),
    getCustomersPerRegion: builder.query({
      query: () => ({
        url: `/clients/customer-count-by-region`,
        method: 'GET',
      }),
      providesTags: ['regionCount'],
    }),

  }),
});

export const { useGetAllClientsQuery, useGetCompletionQuery, useGetCustomersPerRegionQuery, useGetParcClientsQuery, useGetPassageSAVQuery } = clientApiSlice;
