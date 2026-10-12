"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Query() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleQuery = useDebouncedCallback((term: string) => {
    console.log("searching.. ", term);

    const params = new URLSearchParams(searchParams);

    if (term.trim()) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransition(() => replace(`${pathName}?${params.toString()}`));
  }, 300);

  const handleVeg = (isVeg: boolean) => {
    console.log("setting isVeg.. ", isVeg);

    const params = new URLSearchParams(searchParams);

    if (isVeg) {
      params.set("veg", "true");
    } else {
      params.delete("veg");
    }
    startTransition(() => replace(`${pathName}?${params.toString()}`));
  };

  const isVeg = searchParams.get("veg") === "true";

  return (
    <div className="mt-6 max-w-md space-y-4 rounded-lg border bg-white p-4 shadow-sm">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Search</span>
        <input
          name="query"
          onChange={(e) => handleQuery(e.target.value)}
          defaultValue={searchParams.get("query") ?? ""}
          placeholder="Search recipes..."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-3">
          <input
            name="veg"
            type="checkbox"
            onChange={(e) => handleVeg(e.target.checked)}
            defaultChecked={isVeg}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Vegetarian only
          </span>
        </label>

        <div className="flex h-5 w-5 items-center justify-center">
          <span
            className={`h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-900 transition-opacity ${
              isPending ? "animate-spin opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
