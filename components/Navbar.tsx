"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Setup", path: "/interview/setup" },
    { name: "Session", path: "/interview/session" },
    { name: "Report", path: "/interview/report" },
  ];

  return (
    <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      {/* Modification 1: Wrapped Logo in Link for Home navigation */}
      <Link
        href="/"
        className="font-bold text-xl text-white cursor-pointer hover:opacity-80 transition-opacity"
      >
        Intervyo AI
      </Link>

      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            {/* Modification 2: Added cursor-pointer to ensure the hand icon appears */}
            <Button
              variant={pathname === item.path ? "default" : "outline"}
              size="sm"
              className="cursor-pointer"
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
