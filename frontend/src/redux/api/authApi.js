import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api/v1", credentials: 'include'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query(body)  {
                return {
                    url: "/login",
                    method: "POST",
                    body
                }
            }
        }),
        register: builder.mutation({
            query(body)  {
                return {
                    url: "/register",
                    method: "POST",
                    body
                }
            }
        })

    })
})

export const { useLoginMutation, useRegisterMutation} = authApi;