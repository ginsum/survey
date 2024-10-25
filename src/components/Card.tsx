import { ReactNode } from "react";

export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col px-6 py-6 border border-zinc-200 rounded-2xl shadow gap-2 ${className}`}
    >
      {children}
    </div>
  );
}
