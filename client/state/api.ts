import {
  ExpenseByCategory,
  ExpenseSummary,
  NewProduct,
  Products,
  PurchaseSummary,
  SalesSummary,
} from "@/types/dashboard.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface User {
  userId: string;
  name: string;
  email: string;
}
interface DashboardMetrics {
  popularProducts: Products[];
  salesSummary: SalesSummary[];
  expenseByCategorySummary: ExpenseByCategory[];
  expenseSummary: ExpenseSummary[];
  purchaseSummary: PurchaseSummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["dashboardMetrics", "products", "expenses"],
  reducerPath: "api",
  endpoints: (build) => ({
    getdashboardMetrix: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["dashboardMetrics"],
    }),
    getProducts: build.query<Products[], void | string>({
      query: (search) => ({
        url: "/product",
        params: search ? { search } : {},
      }),
      providesTags: ["products"],
    }),
    createProduct: build.mutation<NewProduct, Products | void>({
      query: (newProduct) => ({
        url: "/product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["products"],
    }),
    getUsers: build.query<User[], void | null>({
      query: () => "/users",
    }),
    getExpenses: build.query<any, void>({
      query: () => "/expenses",
      providesTags: ["expenses"],
    }),
  }),
});
export const {
  useGetdashboardMetrixQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesQuery,
} = api;
