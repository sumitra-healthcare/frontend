"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, FileText, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TabItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const tabs: TabItem[] = [
  { name: "OPD", href: "/doctor/opd", icon: Stethoscope },
  { name: "Past Cases", href: "/doctor/past-cases", icon: FileText },
  { name: "Coordinators", href: "/doctor/coordinators", icon: Users },
  { name: "Profile", href: "/doctor/profile", icon: User },
];

export default function DoctorTabs() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[44px]">
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname?.startsWith(tab.href + "/");
            const Icon = tab.icon;

            return (
              <Link key={tab.href} href={tab.href}>
                <Button
                  variant="ghost"
                  className={`
                    flex items-center gap-2 px-4 md:px-6 py-5 md:py-6 rounded-none border-b-2 transition-colors
                    ${
                      isActive
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline font-medium">{tab.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
