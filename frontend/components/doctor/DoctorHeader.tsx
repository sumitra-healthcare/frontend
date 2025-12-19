"use client";

import { Stethoscope, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorHeaderProps {
  doctorName: string;
  onLogout: () => void;
}

export default function DoctorHeader({ doctorName, onLogout }: DoctorHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[44px] py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo and Portal Info */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-2.5 bg-blue-50 rounded-lg">
              <Stethoscope className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Doctor Portal</h1>
              <p className="text-xs md:text-sm text-gray-600">Dr. {doctorName}</p>
            </div>
          </div>

          {/* Right Section: Logout Button */}
          <Button
            variant="ghost"
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
