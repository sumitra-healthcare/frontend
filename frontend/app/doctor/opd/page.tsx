"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Loader2 } from "lucide-react";
import PatientQueueCard from "@/components/doctor/PatientQueueCard";
import QueueStats from "@/components/doctor/QueueStats";
import { getDoctorDashboard, DashboardQueueItem } from "@/lib/api";
import { toast } from "sonner";

// Helper to format date
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OPDQueuePage() {
  const router = useRouter();
  const [queue, setQueue] = useState<DashboardQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      setIsLoading(true);
      const response = await getDoctorDashboard();

      if (response.data.status === "success") {
        setQueue(response.data.data.todaysQueue || []);
      }
    } catch (error: any) {
      console.error("Error loading queue:", error);
      toast.error("Failed to load queue", {
        description: error.response?.data?.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConsultation = (appointmentId: string) => {
    router.push(`/doctor/consultation/${appointmentId}`);
  };

  // Calculate stats
  const waitingPatients = queue.filter(
    (q) => q.triageStatus === "waiting" || q.triageStatus === "ready"
  );
  const inProgressPatients = queue.filter((q) => q.triageStatus === "in-progress");
  const completedPatients = queue.filter((q) => q.triageStatus === "completed");

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading queue...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          OPD - Patient Queue
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          Today: {formatDate(new Date())}
        </p>
      </div>

      {/* Stats Row */}
      <QueueStats
        waiting={waitingPatients.length}
        inProgress={inProgressPatients.length}
        completed={completedPatients.length}
      />

      {/* Waiting Queue Section */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          Waiting Queue ({waitingPatients.length})
        </h2>

        {waitingPatients.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No patients in waiting queue</p>
            <p className="text-sm text-gray-400 mt-1">
              Patients will appear here when they are ready
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {waitingPatients.map((patient) => (
              <PatientQueueCard
                key={patient.appointmentId}
                patient={patient.patient}
                scheduledTime={patient.scheduledTime}
                appointmentId={patient.appointmentId}
                onStartConsultation={handleStartConsultation}
              />
            ))}
          </div>
        )}
      </div>

      {/* In Progress Section (Optional - can show ongoing consultations) */}
      {inProgressPatients.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            In Progress ({inProgressPatients.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {inProgressPatients.map((patient) => (
              <PatientQueueCard
                key={patient.appointmentId}
                patient={patient.patient}
                scheduledTime={patient.scheduledTime}
                appointmentId={patient.appointmentId}
                onStartConsultation={handleStartConsultation}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section (Optional - can show completed today) */}
      {completedPatients.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Completed Today ({completedPatients.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {completedPatients.map((patient) => (
              <PatientQueueCard
                key={patient.appointmentId}
                patient={patient.patient}
                scheduledTime={patient.scheduledTime}
                appointmentId={patient.appointmentId}
                onStartConsultation={handleStartConsultation}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
