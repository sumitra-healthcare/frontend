import axios, { AxiosResponse, AxiosError } from "axios";

// Interfaces for Doctor API
export interface DoctorRegistrationRequest {
  fullName: string;
  email: string;
  medicalRegistrationId: string;
  specialty: string;
  password: string;
}

export interface DoctorRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    doctor: {
      _id: string;
      fullName: string;
      email: string;
      medicalRegistrationId: string;
      specialty: string;
      roles: string[];
      accountStatus: "pending_verification" | "active" | "suspended";
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface DoctorLoginRequest {
  email: string;
  password: string;
}

export interface DoctorLoginResponse {
  success: boolean;
  message: string;
  data: {
    doctor: {
      _id: string;
      fullName: string;
      email: string;
      medicalRegistrationId: string;
      specialty: string;
      roles: string[];
      accountStatus: "pending_verification" | "active" | "suspended";
      lastLogin: string;
    };
    accessToken: string;
  };
}

export interface DoctorProfileResponse {
  success: boolean;
  data: {
    doctor: {
      _id: string;
      fullName: string;
      email: string;
      medicalRegistrationId: string;
      specialty: string;
      roles: string[];
      accountStatus: "pending_verification" | "active" | "suspended";
      phoneNumber?: string;
      address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
      qualifications?: Array<{ degree: string; institution: string; year: number }>;
      experience?: number;
      isVerified?: boolean;
      verificationDate?: string;
      lastLogin?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface UpdateDoctorProfileRequest {
  fullName?: string;
  specialty?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  qualifications?: Array<{ degree: string; institution: string; year: number }>;
  experience?: number;
}

export interface UpdateDoctorProfileResponse {
  success: boolean;
  message: string;
  data: {
    doctor: DoctorProfileResponse["data"]["doctor"]; // Re-use the doctor type
  };
}

// Interfaces for Admin API
export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: {
      _id: string;
      fullName: string;
      email: string;
      role: "super_admin" | "admin" | "moderator";
      permissions: {
        canManageDoctors: boolean;
        canManagePatients: boolean;
        canManageSystem: boolean;
        canViewAnalytics: boolean;
        canManageSettings: boolean;
      };
      accountStatus: "active" | "suspended" | "inactive";
      lastLogin?: string;
      phoneNumber?: string;
      address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      };
      isSuperAdmin: boolean;
      accountAge?: number;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
}

export interface AdminRegistrationRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AdminRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    admin: AdminLoginResponse["data"]["admin"];
  };
}

export interface AdminProfileResponse {
  success: boolean;
  data: {
    admin: AdminLoginResponse["data"]["admin"];
  };
}

export interface UpdateAdminProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface AdminDashboardStatsResponse {
  success: boolean;
  data: {
    doctors: number;
    admins: number;
  };
}

export interface GetDoctorsResponse {
  success: boolean;
  data: {
    doctors: Array<{
      _id: string;
      fullName: string;
      email: string;
      medicalRegistrationId: string;
      specialty: string;
      accountStatus: "pending_verification" | "active" | "suspended";
      phoneNumber?: string;
      experience?: number;
      isVerified?: boolean;
      verificationDate?: string;
      lastLogin?: string;
      createdAt: string;
      updatedAt: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface VerifySuspendDoctorResponse {
  success: boolean;
  message: string;
  data: {
    doctor: {
      _id: string;
      fullName: string;
      email: string;
      medicalRegistrationId: string;
      specialty: string;
      accountStatus: "pending_verification" | "active" | "suspended";
    };
  };
}

// Interfaces for Dashboard API
export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  patientUhid: string;
  type: string;
  status: string;
}

// Backend appointment structure from Postman collection
export interface BackendAppointment {
  appointmentId: string;
  scheduledTime: string;
  patient: {
    id: string;
    name?: string;
  };
  appointmentType: string;
  status: string;
}

export interface AppointmentsResponse {
  status: string;
  data: Appointment[];
}

export interface BackendAppointmentsResponse {
  status: string;
  data: BackendAppointment[];
}

export interface ActionItemsSummaryResponse {
  status: string;
  data: {
    newResults: number;
    consultationRequests: number;
    unreadMessages: number;
  };
}

// Backend action items structure from Postman collection
export interface BackendActionItemsResponse {
  status: string;
  data: {
    newResultsToReview: number;
    pendingConsultationRequests: number;
    unreadPatientMessages: number;
  };
}

export interface PerformanceStatsResponse {
  status: string;
  data: {
    patientsSeen: number;
    patientsScheduled: number;
    avgConsultTimeMinutes: number;
    pendingDocumentation: number;
  };
}

// Backend performance stats structure from Postman collection
export interface BackendPerformanceStatsResponse {
  status: string;
  data: {
    patientsSeen: number;
    patientsScheduled: number;
    averageConsultTimeMinutes: number;
    pendingDocumentationCount: number;
  };
}

// Interfaces for Workbench API
export interface WorkbenchSummaryResponse {
  success: boolean;
  data: {
    // Define workbench summary structure based on backend implementation
    summary: any; // TODO: Define proper interface once backend implementation is clear
  };
}

export interface DoctorStatsResponse {
  success: boolean;
  data: {
    // Define stats structure based on backend implementation
    stats: any; // TODO: Define proper interface once backend implementation is clear
  };
}

// Interfaces for Encounter API
export interface EncounterDataResponse {
  success: boolean;
  data: {
    bundle: {
      encounter: {
        id: string;
        status: string;
        appointmentId: string;
      };
      patient: {
        id: string;
        name: string;
        uhid: string;
        demographics: {
          age: number;
          gender: string;
          allergies?: string[];
        };
      };
      medicalHistory: Array<{
        id: string;
        date: string;
        type: string;
        title: string;
        details: string;
      }>;
      aiAnalysis: {
        summary: string;
        recommendations: string[];
        confidence: number;
        processingTimeMs: number;
      };
      encounterForm: {
        chiefComplaint?: string;
        diagnosis?: Array<{ id: string; name: string }>;
        medications?: Array<{ name: string; dosage: string; frequency: string }>;
      };
    };
  };
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for refresh token cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage on client side (not during SSR)
    if (typeof window !== 'undefined') {
      // Prioritize doctor token for doctor endpoints, admin token for admin endpoints
      const isAdminEndpoint = config.url?.includes('/admin');
      const token = isAdminEndpoint 
        ? localStorage.getItem("adminAccessToken") 
        : localStorage.getItem("accessToken") || localStorage.getItem("adminAccessToken");
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Determine which refresh endpoint to use
        const isAdminEndpoint = originalRequest.url?.includes('/admin');
        const refreshEndpoint = isAdminEndpoint ? '/admin/refresh-token' : '/refresh-token';
        
        // Try to refresh the token
        const refreshResponse = await axios.post(
          `${API_BASE_URL}${refreshEndpoint}`,
          {},
          { withCredentials: true }
        );
        
        const newToken = refreshResponse.data.data.accessToken;
        
        // Update the appropriate token in localStorage (client-side only)
        if (typeof window !== 'undefined') {
          if (isAdminEndpoint) {
            localStorage.setItem("adminAccessToken", newToken);
          } else {
            localStorage.setItem("accessToken", newToken);
          }
        }
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to appropriate login page (client-side only)
        if (typeof window !== 'undefined') {
          const isAdminEndpoint = originalRequest.url?.includes('/admin');
          localStorage.removeItem("accessToken");
          localStorage.removeItem("adminAccessToken");
          localStorage.removeItem("user");
          localStorage.removeItem("admin");
          window.location.href = isAdminEndpoint ? "/admin/login" : "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// --- API Functions for Doctors --- 

// 1. Doctor Registration
export const registerDoctor = async (data: DoctorRegistrationRequest): Promise<AxiosResponse<DoctorRegistrationResponse>> => {
  return apiClient.post("/register", data);
};

// 2. Doctor Login
export const loginDoctor = async (data: DoctorLoginRequest): Promise<AxiosResponse<DoctorLoginResponse>> => {
  return apiClient.post("/login", data);
};

// 3. Refresh Token for Doctors
export const refreshToken = async () => {
  return apiClient.post("/refresh-token");
};

// 4. Doctor Logout
export const logoutDoctor = async () => {
  return apiClient.post("/logout");
};

// 5. Get Doctor Profile
export const getDoctorProfile = async (): Promise<AxiosResponse<DoctorProfileResponse>> => {
  return apiClient.get("/profile");
};

// 6. Update Doctor Profile
export const updateDoctorProfile = async (data: UpdateDoctorProfileRequest): Promise<AxiosResponse<UpdateDoctorProfileResponse>> => {
  return apiClient.put("/profile", data);
};

// --- API Functions for Admin ---

// 7. Admin Registration
export const registerAdmin = async (data: AdminRegistrationRequest): Promise<AxiosResponse<AdminRegistrationResponse>> => {
  return apiClient.post("/admin/register", data);
};

// 7. Admin Login
export const loginAdmin = async (data: AdminLoginRequest): Promise<AxiosResponse<AdminLoginResponse>> => {
  return apiClient.post("/admin/login", data);
};

// 8. Get Admin Profile
export const getAdminProfile = async (): Promise<AxiosResponse<AdminProfileResponse>> => {
  return apiClient.get("/admin/profile");
};

// 9. Update Admin Profile
export const updateAdminProfile = async (data: UpdateAdminProfileRequest): Promise<AxiosResponse<AdminProfileResponse>> => {
  return apiClient.put("/admin/profile", data);
};

// 10. Admin Refresh Token
export const refreshAdminToken = async () => {
  return apiClient.post("/admin/refresh-token");
};

// 11. Admin Logout
export const logoutAdmin = async () => {
  return apiClient.post("/admin/logout");
};

// 12. Admin Dashboard Stats
export const getAdminDashboardStats = async (): Promise<AxiosResponse<AdminDashboardStatsResponse>> => {
  return apiClient.get("/admin/dashboard/stats");
};

// 8. List Doctors
export const getDoctors = async (params?: { status?: string; page?: number; limit?: number }): Promise<AxiosResponse<GetDoctorsResponse>> => {
  return apiClient.get("/admin/doctors", { params });
};

// 9. Verify Doctor Account
export const verifyDoctorAccount = async (doctorId: string): Promise<AxiosResponse<VerifySuspendDoctorResponse>> => {
  return apiClient.post(`/admin/doctors/${doctorId}/verify`);
};

// 10. Suspend Doctor Account
export const suspendDoctorAccount = async (doctorId: string): Promise<AxiosResponse<VerifySuspendDoctorResponse>> => {
  return apiClient.post(`/admin/doctors/${doctorId}/suspend`);
};

// --- API Functions for Workbench ---

// 11. Get Workbench Summary
export const getWorkbenchSummary = async (): Promise<AxiosResponse<WorkbenchSummaryResponse>> => {
  return apiClient.get("/workbench/summary");
};

// 12. Get Doctor Stats
export const getDoctorStats = async (): Promise<AxiosResponse<DoctorStatsResponse>> => {
  return apiClient.get("/practitioners/me/stats");
};

// --- API Functions for Dashboard ---
// Note: These endpoints may need to be implemented in the backend
// Fallback to mock data if endpoints don't exist yet

// 11. Get Today's Appointments
export const getTodaysAppointments = async (): Promise<AxiosResponse<AppointmentsResponse>> => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  
  const response = await apiClient.get<BackendAppointmentsResponse>(`/appointments?date=${dateString}`);
  
  // Transform backend data to frontend format
  const transformedData: Appointment[] = response.data.data.map(appointment => ({
    id: appointment.appointmentId,
    time: appointment.scheduledTime,
    patientName: appointment.patient.name || 'Unknown Patient',
    patientUhid: appointment.patient.id,
    type: appointment.appointmentType,
    status: appointment.status
  }));
  
  return {
    ...response,
    data: {
      status: response.data.status,
      data: transformedData
    }
  };
};

// 12. Get Action Items Summary
export const getActionItemsSummary = async (): Promise<AxiosResponse<ActionItemsSummaryResponse>> => {
  const response = await apiClient.get<BackendActionItemsResponse>("/workbench/summary");
  
  // Transform backend data to frontend format
  const transformedData = {
    newResults: response.data.data.newResultsToReview,
    consultationRequests: response.data.data.pendingConsultationRequests,
    unreadMessages: response.data.data.unreadPatientMessages
  };
  
  return {
    ...response,
    data: {
      status: response.data.status,
      data: transformedData
    }
  };
};

// 13. Get Performance Stats
export const getPerformanceStats = async (): Promise<AxiosResponse<PerformanceStatsResponse>> => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  
  const response = await apiClient.get<BackendPerformanceStatsResponse>(`/practitioners/me/stats?date=${dateString}`);
  
  // Transform backend data to frontend format
  const transformedData = {
    patientsSeen: response.data.data.patientsSeen,
    patientsScheduled: response.data.data.patientsScheduled,
    avgConsultTimeMinutes: response.data.data.averageConsultTimeMinutes,
    pendingDocumentation: response.data.data.pendingDocumentationCount
  };
  
  return {
    ...response,
    data: {
      status: response.data.status,
      data: transformedData
    }
  };
};

// --- API Functions for Encounter ---
// Note: These endpoints may need to be implemented in the backend

// 14. Get Encounter Details (Create encounter bundle with AI analysis)
export const getEncounterDetails = async (appointmentId: string): Promise<AxiosResponse<EncounterDataResponse>> => {
  return apiClient.get(`/encounters/${appointmentId}/bundle`);
};

// 15. Finalize Encounter with Form Data
export interface FinalizeEncounterRequest {
  appointmentId?: string; // optional but recommended for reliable linkage
  chiefComplaint: string;
  presentingSymptoms: string[];
  diagnosis: Array<{
    code: string;
    description: string;
    confidence: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    oxygenSaturation: string;
  };
  doctorRemarks: string;
  followUpInstructions: string;
}

export interface FinalizeEncounterResponse {
  success: boolean;
  data: {
    encounter: {
      id: string;
      status: string;
    };
    appointment: {
      id: string;
      status: string;
    };
    nextSteps: string[];
  };
}

export const finalizeEncounter = async (
  encounterId: string, 
  data: FinalizeEncounterRequest
): Promise<AxiosResponse<FinalizeEncounterResponse>> => {
  return apiClient.post(`/encounters/${encounterId}/finalize`, data);
};

// --- Patient API Functions ---
export interface CreatePatientRequest {
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  bloodType?: string;
  allergies?: string[];
  address?: { street?: string; city?: string; state?: string; zipCode?: string; country?: string };
  emergencyContact?: { name?: string; phone?: string; relationship?: string };
  insurance?: { provider?: string; policyNumber?: string; groupNumber?: string };
  uhid?: string;
}

export interface PatientListResponse {
  success: boolean;
  message: string;
  data: { results: any[]; total: number; page: number; limit: number };
}

export interface CreatePatientResponse {
  success: boolean;
  message: string;
  data: { patient: any };
}

export const createPatient = async (data: CreatePatientRequest) => {
  return apiClient.post(`/patients`, data);
};

export const getPatients = async (params?: { name?: string; uhid?: string; email?: string; phone?: string; page?: number; limit?: number }) => {
  return apiClient.get<PatientListResponse>(`/patients`, { params });
};

export const getPatientById = async (id: string) => {
  return apiClient.get(`/patients/${id}`);
};

export const updatePatient = async (id: string, updates: Partial<CreatePatientRequest>) => {
  return apiClient.put(`/patients/${id}`, updates);
};

export const searchPatients = async (q: string, page = 1, limit = 20) => {
  return apiClient.get(`/patients/search`, { params: { q, page, limit } });
};

// --- Patient Portal (Self) API Functions ---
export interface PatientUpcomingAppointment {
  appointmentId: string;
  scheduledTime: string; // ISO timestamp
  appointmentType?: string | null;
  practitioner: {
    fullName: string | null;
    specialty: string | null;
  };
}

export interface PatientUpcomingAppointmentsResponse {
  status: 'success' | 'error';
  data: PatientUpcomingAppointment[];
}

export interface PatientActivityItem {
  activityId: string;
  date: string; // YYYY-MM-DD
  type: string; // 'Consultation Complete' | 'Lab Results Ready' | etc
  summary: string;
  link: string;
}

export interface PatientActivityResponse {
  status: 'success' | 'error';
  data: PatientActivityItem[];
}

export const getMyUpcomingAppointments = async (params?: { status?: string }) => {
  return apiClient.get<PatientUpcomingAppointmentsResponse>(`/patients/me/appointments`, { params });
};

export const getMyRecentActivity = async () => {
  return apiClient.get<PatientActivityResponse>(`/patients/me/activity`);
};

export interface PatientProfile {
  id: string;
  fullName: string;
  uhid: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodType?: string;
  allergies?: string[];
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
  insurance?: {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
  };
}

export interface PatientProfileResponse {
  status: 'success' | 'error';
  data: PatientProfile;
}

export const getMyProfile = async () => {
  return apiClient.get<PatientProfileResponse>(`/patients/me/profile`);
};

export interface PatientAppointment {
  appointmentId: string;
  scheduledTime: string;
  appointmentType: string;
  status: string;
  notes?: string;
  isPast: boolean;
  practitioner: {
    fullName: string;
    specialty: string | null;
  };
}

export interface PatientAppointmentsResponse {
  status: 'success' | 'error';
  data: PatientAppointment[];
}

export const getAllMyAppointments = async () => {
  return apiClient.get<PatientAppointmentsResponse>(`/patients/me/appointments/all`);
};

export interface PatientPrescription {
  prescriptionId: string;
  encounterId: string;
  date: string;
  encounterDate?: string;
  chiefComplaint?: string;
  doctor: {
    fullName: string;
    specialty: string | null;
  };
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }>;
  advice?: string | null;
  tests?: Array<{
    name: string;
    instructions?: string;
  }>;
  followUp?: string | null;
}

export interface PatientPrescriptionsResponse {
  status: 'success' | 'error';
  data: PatientPrescription[];
}

export const getMyPrescriptions = async () => {
  return apiClient.get<PatientPrescriptionsResponse>(`/patients/me/prescriptions`);
};

// --- Appointment API Functions ---
export interface CreateAppointmentRequest {
  patientId: string;
  scheduledTime: string; // ISO format
  appointmentType?: string;
}

export const createAppointment = async (data: CreateAppointmentRequest) => {
  return apiClient.post(`/appointments`, data);
};

// --- Patient Auth (Self) ---
export const patientLogin = async (data: { username: string; password: string; }) => {
  // Uses common auth controller
  return apiClient.post(`/auth/login`, data);
};

export const patientRegister = async (data: { username: string; email: string; password: string; }) => {
  return apiClient.post(`/auth/register`, { ...data, role: 'patient' });
};

// --- OAuth Functions ---

// Google OAuth: Get OAuth URL
export interface GoogleOAuthUrlResponse {
  url: string;
}

export const getGoogleOAuthUrl = async (): Promise<AxiosResponse<GoogleOAuthUrlResponse>> => {
  return apiClient.get("/auth/google");
};

// Get current session (for OAuth users)
export interface SessionResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export const getSession = async (): Promise<AxiosResponse<SessionResponse>> => {
  return apiClient.get("/auth/session");
};

// Logout (works for both traditional and OAuth)
export const logout = async (): Promise<AxiosResponse<{ message: string }>> => {
  return apiClient.post("/auth/logout");
};

// Complete OAuth registration for doctors
export interface CompleteOAuthRegistrationRequest {
  email: string;
  oauthToken: string;
  fullName: string;
  medicalRegistrationId: string;
  specialty: string;
}

export interface CompleteOAuthRegistrationResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  accessToken: string;
}

export const completeOAuthRegistration = async (
  data: CompleteOAuthRegistrationRequest
): Promise<AxiosResponse<CompleteOAuthRegistrationResponse>> => {
  return apiClient.post("/auth/oauth/complete-registration", data);
};

// --- Prescription Template API Functions ---
export interface PrescriptionTemplate {
  id: string;
  name: string;
  doctor_id: string;
  header?: string;
  footer?: string;
  elements: {
    sections?: Array<{
      type: 'medications' | 'advice' | 'tests' | 'custom';
      title: string;
      content?: string;
    }>;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateRequest {
  name: string;
  header?: string;
  footer?: string;
  elements: {
    sections?: Array<{
      type: 'medications' | 'advice' | 'tests' | 'custom';
      title: string;
      content?: string;
    }>;
  };
}

export interface TemplateListResponse {
  success: boolean;
  message: string;
  data: {
    results: PrescriptionTemplate[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TemplateResponse {
  success: boolean;
  message: string;
  data: {
    template: PrescriptionTemplate;
  };
}

// Create a new prescription template
export const createTemplate = async (data: CreateTemplateRequest): Promise<AxiosResponse<TemplateResponse>> => {
  return apiClient.post('/prescription-templates', data);
};

// Get all templates for the logged-in doctor
export const getTemplates = async (params?: { page?: number; limit?: number }): Promise<AxiosResponse<TemplateListResponse>> => {
  return apiClient.get('/prescription-templates', { params });
};

// Get a single template by ID
export const getTemplateById = async (id: string): Promise<AxiosResponse<TemplateResponse>> => {
  return apiClient.get(`/prescription-templates/${id}`);
};

// Update a template
export const updateTemplate = async (id: string, data: Partial<CreateTemplateRequest>): Promise<AxiosResponse<TemplateResponse>> => {
  return apiClient.put(`/prescription-templates/${id}`, data);
};

// Delete a template
export const deleteTemplate = async (id: string): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
  return apiClient.delete(`/prescription-templates/${id}`);
};

// --- Prescription API Functions ---
export interface Prescription {
  id: string;
  encounter_id: string;
  patient_id: string;
  doctor_id: string;
  template_id?: string;
  content: {
    medications?: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions?: string;
    }>;
    advice?: string;
    tests?: Array<{
      name: string;
      instructions?: string;
    }>;
    followUp?: string;
    notes?: string;
  };
  created_at: string;
  updated_at: string;
  // For detailed view with patient info
  patients?: {
    id: string;
    full_name: string;
    uhid: string;
    date_of_birth: string;
    gender: string;
  };
  encounters?: {
    id: string;
    encounter_date: string;
  };
}

export interface CreatePrescriptionRequest {
  encounterId: string;
  patientId: string;
  templateId?: string;
  content: {
    medications?: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions?: string;
    }>;
    advice?: string;
    tests?: Array<{
      name: string;
      instructions?: string;
    }>;
    followUp?: string;
    notes?: string;
  };
}

export interface PrescriptionListResponse {
  success: boolean;
  message: string;
  data: {
    prescriptions?: Prescription[];
    results?: Prescription[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface PrescriptionResponse {
  success: boolean;
  message: string;
  data: {
    prescription: Prescription;
  };
}

// Create a new prescription
export const createPrescription = async (data: CreatePrescriptionRequest): Promise<AxiosResponse<PrescriptionResponse>> => {
  return apiClient.post('/prescriptions', data);
};

// Get all prescriptions for an encounter
export const getPrescriptionsByEncounter = async (encounterId: string): Promise<AxiosResponse<PrescriptionListResponse>> => {
  return apiClient.get(`/prescriptions/encounter/${encounterId}`);
};

// Get all prescriptions for a patient
export const getPrescriptionsByPatient = async (patientId: string, params?: { page?: number; limit?: number }): Promise<AxiosResponse<PrescriptionListResponse>> => {
  return apiClient.get(`/prescriptions/patient/${patientId}`, { params });
};

// Get a single prescription by ID
export const getPrescriptionById = async (id: string): Promise<AxiosResponse<PrescriptionResponse>> => {
  return apiClient.get(`/prescriptions/${id}`);
};

// Update a prescription
export const updatePrescription = async (id: string, data: Partial<CreatePrescriptionRequest>): Promise<AxiosResponse<PrescriptionResponse>> => {
  return apiClient.put(`/prescriptions/${id}`, data);
};
