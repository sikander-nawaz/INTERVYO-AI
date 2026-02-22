import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex h-screen items-center justify-center">
        <Link href="/interview/setup">
          <Button size="lg">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}
