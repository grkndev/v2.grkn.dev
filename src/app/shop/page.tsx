import { ShopCard } from "@/components/shop-card";
import React from "react";
import products from "./products";

export default function Shop() {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Shopping</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ShopCard
            key={index}
            title={product.title}
            description={product.description}
            tags={product.tags}
            image={product.image}
            href={product.href}
            demoPage={product.demoPage}
          />
        ))}
      </div>
    </div>
  );
}
