"use client";

import { startInterview } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const testAPI = async () => {
    try {
      await startInterview("SDE", "Intern");
    } catch (e) {
      console.log("API connected (backend not running yet)");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={testAPI}>Test API Layer</Button>
    </div>
  );
}
