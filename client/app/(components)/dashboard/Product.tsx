import { ShoppingBag } from "lucide-react";
import React from "react";
import { useGetdashboardMetrixQuery } from "@/state/api";
import Rating from "./Rating";

const Products = () => {
  const { data: dashboardMetrics, isLoading } = useGetdashboardMetrixQuery();

  return (
    <div className="row-span-3 xl:row-span-8 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="absolute inset-0 bg-gray-400 animate-pulse" />
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={"./file.svg"}
                    width={48}
                    height={48}
                    className="rounded-lg bg-gray-100 w-8 h-8"
                  />
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
