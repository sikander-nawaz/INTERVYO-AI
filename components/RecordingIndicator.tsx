"use client";

import { Mic } from "lucide-react";

export default function RecordingIndicator({
  recording,
}: {
  recording: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`p-6 rounded-full transition-all ${
          recording ? "bg-red-500 animate-pulse" : "bg-gray-300"
        }`}
      >
        <Mic className="text-white" size={32} />
      </div>

      <p className="text-sm text-muted-foreground">
        {recording ? "Recording..." : "Ready"}
      </p>
    </div>
  );
}
