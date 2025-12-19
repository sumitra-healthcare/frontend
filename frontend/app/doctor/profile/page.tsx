"use client";

import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
          Profile
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
        <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium text-lg">Profile Settings Coming Soon</p>
        <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
          This page will allow you to manage your profile information and preferences.
        </p>
      </div>
    </div>
  );
}
