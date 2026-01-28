"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

const HIDE_SIDEBAR_ROUTES = ["/projects", "/login", '/about'];

export default function SidebarWrapper() {
  const pathname = usePathname();

  const hideSidebar = HIDE_SIDEBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (hideSidebar) return null;
  return <Sidebar />;
}
