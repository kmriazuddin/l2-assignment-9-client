"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useFlashProduct } from "@/hooks/product.hook";
import Link from "next/link";

const FlashSale = () => {
  const { data: { data: product } = {} } = useFlashProduct();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dataToDisplay = isMobile ? product?.slice(0, 6) : product;

  return (
    <div>
      <div className="w-full justify-between h-10 flex items-center bg-pink-500 text-white px-4">
        <p> Flash Sale</p>
        <Button className="text-white" variant={"link"}>
          <Link href={"/flashsale"}>View all</Link> <ArrowRight></ArrowRight>
        </Button>
      </div>
      <div className="grid mt-2 justify-items-center xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 gap-2  container mx-auto  overflow-hidden max-h-[430px]  gap-y-5  sm:h-[239px]">
        {dataToDisplay?.map((productData, i) => (
          <Card key={i} className="w-32 h-fit m-0 p-0">
            <CardHeader className=" mb-0 pb-0  px-0 py-0">
              <div className="flex w-full h-32  p-3 justify-center items-center rounded-2xl overflow-hidden">
                <Image
                  className="w-full rounded-lg object-cover h-full"
                  width={200}
                  height={100}
                  src={productData.product.images[0]}
                  alt=""
                ></Image>
              </div>
              <CardTitle className="text-sm px-2">
                <Link href={`/product/${productData.productId}`}>
                  {" "}
                  {productData.product.name.length > 14 ? (
                    <>{productData.product.name.slice(0, 14)}...</>
                  ) : (
                    productData.product.name
                  )}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs pt-0 mt-0 px-2 pb-2 ">
              <p className="text-base font-medium">
                {productData.product.price -
                  (productData.product.price * productData.discount) / 100}
              </p>
              <p className="flex gap-4">
                <span>{productData.product.price}</span>
                <span>{productData.discount}%</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
