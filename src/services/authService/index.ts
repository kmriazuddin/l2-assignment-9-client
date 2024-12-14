/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import config from "@/config";

import { cookies } from "next/headers";

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/auth/user-login`, userData);

    // Set the token in a cookie
    (await cookies()).set("accessToken", data?.data?.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message || error);
  }
};

export const createUser = async (userData: any) => {
  try {
    const { data } = await axiosInstance.post(
      `${config.backendApi}/user/create-user`,
      userData
    );

    (await cookies()).set("accessToken", data?.data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message || error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }

  return await decode;
};

export const setNewPass = async (passData: {
  token: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.patch("/user/set-pass", passData);

    return data;
  } catch (error: any) {
    if (error?.response?.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
};

export const resetPass = async (userEmail: { email: string }) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset", userEmail);
    return data;
  } catch (error: any) {
    if (error?.response?.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
