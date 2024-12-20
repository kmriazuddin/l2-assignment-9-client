import config from "@/config";
import React from "react";
import CategorieAction from "./CategoryAction";

const page = async () => {
  const res = await fetch(`${config.backendApi}/category`, {
    cache: "no-store",
    next: { tags: ["all-category"] },
  });
  const data = await res.json();

  return (
    <div>
      {data && <CategorieAction categories={data.data}></CategorieAction>}
    </div>
  );
};

export default page;
