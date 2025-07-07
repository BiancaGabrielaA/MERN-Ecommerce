import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: "/api/v1", credentials: 'include'}),
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
              url: "/products",
              params: {
                page: params?.page,
                keyword: params?.keyword,
                category: params?.category,
                "price[gte]": params?.min,
                "price[lte]": params?.max,
              }
            })
        }),
        getProductDetails: builder.query({
            query: (id) =>  `/products/${id}`,
        })

    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;