import React from "react";
import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <Loader className="animate-spin text-9xl" />
    </div>
  );
}

export default Loading;
