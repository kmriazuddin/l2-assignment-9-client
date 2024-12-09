"use client";

import React, { useEffect, useState } from "react";
import { useVendorShop, useVendorSingleShop } from "@/src/hooks/shop.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import ShopDetails from "./ShowDetails";

const Shop = () => {
  const { data } = useVendorShop();
  const [selected, setSelected] = useState(data?.data[0].shopId || "");
  const { data: { data: singleShop } = {} } = useVendorSingleShop(selected);

  useEffect(() => {
    if (data?.data[0]?.shopId) {
      setSelected(data?.data[0].shopId);
    }
  }, [data]);

  return (
    <div className="px-5">
      <div className="mb-5 mt-2 ">
        <Select
          onValueChange={(shopId) => setSelected(shopId)}
          value={selected}
          disabled={!data || data?.data.length <= 0}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose Your Shop" />
          </SelectTrigger>
          <SelectContent>
            {data?.data.map((option, i) => (
              <SelectItem key={i} value={option?.shopId}>
                {option?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ShopDetails shop={singleShop!}></ShopDetails>
    </div>
  );
};

export default Shop;