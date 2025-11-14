"use client";

import { useNavbar } from "@/contexts/NavbarContext";
import dynamic from "next/dynamic";

// Dynamically import Navbar with SSR disabled to prevent hydration mismatch
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPowered } = useNavbar();

  return (
    <>
      <Navbar />
      <main className={isPowered ? "lg:pl-32" : ""}>{children}</main>
    </>
  );
}
