"use client";
import { useToast } from "../hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded shadow-lg bg-white dark:bg-gray-900 border-l-4 ${
            toast.variant === "destructive"
              ? "border-red-500 text-red-700"
              : "border-blue-500 text-blue-700"
          }`}
          onClick={() => dismiss(toast.id)}
        >
          <div className="font-bold">{toast.title}</div>
          <div>{toast.description}</div>
        </div>
      ))}
    </div>
  );
}