"use client";
import Rating from "@/app/(components)/dashboard/Rating";
import ProductModel from "@/app/(components)/ProductModel";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { Products } from "@/types/dashboard.types";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [modelOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchItem, setSeachItem] = useState<string | null>("");
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.products;
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (newProduct: Products) => {
    const { data, error } = await createProduct(newProduct);
    console.log("newProduct : ", newProduct);

    if (data) console.log(data);
    if (error) console.log(error);
  };
  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchItem!}
            onChange={(e) => setSeachItem(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product: Products) => (
            <div
              key={product.productId.toString()}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <img
                  src="./globe.svg"
                  className="h-8 w-8 rounded-lg bg-gray-300"
                  alt="img"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <ProductModel
        isOpen={modelOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default page;
