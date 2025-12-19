"use client";

import { FileText } from "lucide-react";

export default function PastCasesPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Past Cases
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          View your historical patient consultations
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 font-medium text-lg">Past Cases Coming Soon</p>
        <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
          This page will display historical patient encounters and completed consultations.
        </p>
      </div>
    </div>
  );
}
