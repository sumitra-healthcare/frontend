"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PatientProfileWidget from '@/components/patient/PatientProfileWidget';
import PatientAppointmentsWidget from '@/components/patient/PatientAppointmentsWidget';
import PatientPrescriptionsWidget from '@/components/patient/PatientPrescriptionsWidget';
import { Stethoscope, LogOut, User, Calendar, FileText } from 'lucide-react';

type TabType = 'profile' | 'appointments' | 'prescriptions';

export default function PatientDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  useEffect(() => {
    // Check if patient is authenticated
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    
    if (!token || !storedUser) {
      router.replace('/auth?tab=login&role=patient');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      // Check if user is a patient
      if (userData.role !== 'patient') {
        router.replace('/auth?tab=login&role=patient');
        return;
      }
      setUser(userData);
    } catch (e) {
      router.replace('/auth?tab=login&role=patient');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.replace('/auth?tab=login&role=patient');
  };

  const patientName = user?.username || 'Patient';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile' as TabType, label: 'My Profile', icon: User },
    { id: 'appointments' as TabType, label: 'Appointments', icon: Calendar },
    { id: 'prescriptions' as TabType, label: 'Prescriptions', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Stethoscope className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">MedMitra</span>
                <p className="text-xs text-gray-500">Patient Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-700">
                Welcome, <span className="font-semibold text-purple-600">{patientName}</span>
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Healthcare Dashboard</h1>
          <p className="text-gray-600">View your medical information and health records</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-2" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all
                      ${
                        isActive
                          ? 'bg-purple-100 text-purple-700 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-purple-600" />
                  My Profile
                </h2>
                <p className="text-sm text-gray-600 mt-1">Your personal and medical information</p>
              </div>
              <PatientProfileWidget />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  My Appointments
                </h2>
                <p className="text-sm text-gray-600 mt-1">View your upcoming and past appointments</p>
              </div>
              <PatientAppointmentsWidget />
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  My Prescriptions
                </h2>
                <p className="text-sm text-gray-600 mt-1">View and download your prescriptions</p>
              </div>
              <PatientPrescriptionsWidget />
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your profile information is managed by your healthcare provider. 
            If you notice any discrepancies, please contact your doctor's office.
          </p>
        </div>
      </main>
    </div>
  );
}
