"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-white dark:bg-gray-950 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center animate-pulse">
          <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Something Went Wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error.message ||
              "We encountered an unexpected error. Please try again."}
          </p>
        </div>

        <Button
          onClick={() => reset()}
          className="bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
