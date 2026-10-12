export default function Query3({
  query,
  isVeg,
}: {
  query: string;
  isVeg: boolean;
}) {
  console.log("-------------------- Query3");
  return (
    <form
      // onSubmit={handleSubmit}
      className="mt-6 max-w-md space-y-4 rounded-lg border bg-white p-4 shadow-sm"
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Search</span>

        <input
          name="query"
          defaultValue={query}
          placeholder="Search recipes..."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="flex items-center gap-3">
        <input
          name="veg"
          type="checkbox"
          defaultChecked={isVeg}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        />

        <span className="text-sm font-medium text-gray-700">
          Vegetarian only
        </span>
      </label>

      <button
        type="submit"
        // disabled={isPending}
        className="inline-flex min-w-28 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-70"
      >
        {" "}
        Submit
        {/* <span className="flex h-4 w-4 items-center justify-center">
          <span
            className={`h-4 w-4 rounded-full border-2 border-white/40 border-t-white transition-opacity `}
          />
        </span> */}
        {/* {isPending ? "Searching..." : "Search"} */}
      </button>
    </form>
  );
}
