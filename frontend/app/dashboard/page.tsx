"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/dashboard/Header";
import AppointmentsWidget from "@/components/dashboard/AppointmentsWidget";
import ActionItemsWidget from "@/components/dashboard/ActionItemsWidget";
import PerformanceSnapshotWidget from "@/components/dashboard/PerformanceSnapshotWidget";
import QuickLinksWidget from "@/components/dashboard/QuickLinksWidget";
import AddPatientForm from "@/components/patients/AddPatientForm";
import PatientsList from "@/components/patients/PatientsList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview for today.</p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-stagger">
              <div className="lg:col-span-8 space-y-6 animate-fade-in" style={{"--stagger": 1} as any}>
                <AppointmentsWidget />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="animate-fade-in" style={{"--stagger": 2} as any}>
                  <ActionItemsWidget />
                </div>
                <div className="animate-fade-in" style={{"--stagger": 3} as any}>
                  <PerformanceSnapshotWidget />
                </div>
                <div className="animate-fade-in" style={{"--stagger": 4} as any}>
                  <QuickLinksWidget />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <AddPatientForm />
                <PatientsList />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <ActionItemsWidget />
                <PerformanceSnapshotWidget />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </ProtectedRoute>
  );
}
