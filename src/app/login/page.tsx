"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FieldValues } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CForm from "@/src/components/ui_component/common/Form/CForm";
import CInput from "@/src/components/ui_component/common/Form/CInput";
import CButton from "@/src/components/ui_component/common/Form/CButton";
import { useUserlogin } from "@/src/hooks/auth.hook";
import { AuthContext } from "@/src/providers/AuthProvider";
import { Button } from "@/src/components/ui/button";
import { ResetPassModal } from "./ResetPassModel";

const LoginPage = () => {
  const authData = useContext(AuthContext);

  const router = useRouter();
  const { mutate, isPending } = useUserlogin();

  const onFromSubmit = async (data: FieldValues) => {
    mutate(data, {
      onSuccess: async () => {
        router.push(`/`);

        authData?.setIsLoading(true);
        toast.success("Welcome Back.");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Something Went Wrong!! Try again.");
      },
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-96 ">
        <CForm onFromSubmit={onFromSubmit}>
          <div className="grid gap-3">
            {" "}
            <CInput name="email" label="Email" type="email"></CInput>
            <CInput name="password" label="Password" type="password"></CInput>
            <CButton
              isPending={isPending}
              text="Submit"
              type="submit"
            ></CButton>
          </div>
        </CForm>{" "}
        <div className="flex justify-between items-center mt-2">
          {" "}
          <ResetPassModal></ResetPassModal>
          <Link href={"/signup"} className=" flex font-medium w-fit text-sm">
            {" "}
            <Button variant={"link"}>
              {" "}
              <span className=" gap-2 ">Go to signup page </span>{" "}
              <span className="mt-1">
                {" "}
                <ArrowRight size={17} />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
