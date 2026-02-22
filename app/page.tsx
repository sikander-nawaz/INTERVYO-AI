import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Link href="/interview/setup">
        <Button size="lg">Start Interview</Button>
      </Link>
    </main>
  );
}
