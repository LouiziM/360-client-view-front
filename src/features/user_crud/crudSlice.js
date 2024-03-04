import { apiSlice } from "../../app/api/apiSlice";

export const crudApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            transformResponse: (response) => {
                // Assuming your response is an array of objects
                return response.map((user, index) => ({ ...user, id: index + 1 }));
            }
        }),
        create: builder.mutation({
            query: data => ({
                url: '/register',
                method: 'POST',
                body: { ...data }
            })
        }),
        update: builder.mutation({
            query:   data  => ({
                url: `/users`,
                method: 'PUT',
                body: { ...data  }
            })
        }),
        delete: builder.mutation({
            query: id => ({
                url: `/users`,
                method: 'DELETE',
                body: {id }

            })
        }),
    })
});

export const {
    useGetAllUsersQuery,
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation
} = crudApiSlice;
