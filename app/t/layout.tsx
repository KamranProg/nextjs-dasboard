import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6 px-4">{children}</div>
  );
}
