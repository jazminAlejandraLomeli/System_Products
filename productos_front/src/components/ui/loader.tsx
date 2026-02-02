import type { JSX } from "react";

function FullScreenLoader({texto}: {texto: string}): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-primary mt-2">{texto}</p>
    </div>
  );
}

export { FullScreenLoader };
