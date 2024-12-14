"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CForm from "@/components/ui_component/common/Form/CForm";
import { FieldValues } from "react-hook-form";
import CInput from "@/components/ui_component/common/Form/CInput";
import CButton from "@/components/ui_component/common/Form/CButton";
import CImage from "@/components/ui_component/common/Form/CImage";
import { toast } from "sonner";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";
import { useAddShop } from "@/hooks/shop.hook";

const AddShop = () => {
  const { mutate, isPending } = useAddShop();
  const onFromSubmit = async (data: FieldValues) => {
    const { images: imageFiles, ...otherData } = data;
    const imageUrl = await uploadImagesToCloudinary(imageFiles);

    if (imageUrl) {
      mutate(
        { ...otherData, images: imageUrl },
        {
          onSuccess: () => {
            toast.success("Shop added!");
          },
          onError: () => {
            toast.error("Something went wrong!");
          },
        }
      );
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create A New Shop</CardTitle>
        <CardDescription>Experience Personalized Online Shopping in Bangladesh with FindXBD.</CardDescription>
      </CardHeader>
      <CardContent>
        <CForm onFromSubmit={onFromSubmit}>
          <div className="grid gap-4">
            <CInput label="Name" name="name"></CInput>
            <CInput label="Location" name="location"></CInput>
            <CImage name="images" label="Image"></CImage>
            <CButton
              isPending={isPending}
              type="submit"
              text="Add Shop"
            ></CButton>
          </div>
        </CForm>
      </CardContent>
    </Card>
  );
};

export default AddShop;
