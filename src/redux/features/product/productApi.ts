import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ searchTerm, price, category }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if(price) params.append("price", price)
        // if(category) params.append("category", category)

          if (category && Array.isArray(category)) {
            params.append("category", category.join(","));
          } else if (category) {
            params.append("category", category);
          }

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"]
    }),
    getFlashSaleProducts: builder.query({
      query: () => ({
        url: "/products/flash-sale",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET"
      })
    })
  }),
});

export const { useGetAllProductsQuery, useGetFlashSaleProductsQuery, useGetSingleProductQuery } =
  productApi;
