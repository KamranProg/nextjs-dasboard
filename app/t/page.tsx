import { Suspense } from "react";

import Query from "@/app/t/query";
import Recipes from "@/app/t/recipes";
import Query2 from "./query2";
import Query3 from "./query3";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    veg?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query?.trim() ?? "";
  const veg = searchParams?.veg === "true";

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Recipe Finder
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Query3 query={query} isVeg={veg} />
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <Suspense
          fallback={
            <div className="flex justify-center py-8 text-sm text-gray-500">
              Loading recipes...
            </div>
          }
        >
          <Recipes query={query} veg={veg} />
        </Suspense>
      </div>
    </>
  );
}
