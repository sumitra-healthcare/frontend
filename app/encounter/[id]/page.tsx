"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Eye, Check, X, Plus, Loader2, Sparkles, Send, Heart, Activity, Thermometer, Scale, Ruler, Wind, LucideIcon, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { 
  getEncounterDetails, 
  finalizeEncounter, 
  FinalizeEncounterRequest, 
  getDoctorProfile,
  invokeAlfaEncounter,
  invokeAlfaChat,
  AlfaRecommendations,
  getVitalsDefinitions,
  getDoctorVitalsConfig,
  VitalDefinition
} from "@/lib/api";
import dynamic from "next/dynamic";
import EncounterPreview from "@/components/doctor/EncounterPreview";
import { RecommendationSection } from "@/components/doctor/RecommendationSection";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, FlaskConical, GripVertical } from "lucide-react";

// Dynamically import PDF viewer wrapper to avoid SSR issues
const PDFViewerWrapper = dynamic(
  () => import("@/components/pdf/PDFViewerWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }
);

// Types
interface Medication {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
}

interface Vitals {
  [key: string]: string;
}

// Icon mapping for vitals
const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  activity: Activity,
  thermometer: Thermometer,
  scale: Scale,
  ruler: Ruler,
  wind: Wind,
};

// Draft data structure for localStorage
interface EncounterFormDraft {
  healthHistory: string;
  vitals: Vitals;
  chiefComplaint: string;
  symptoms: string[];
  diagnoses: string[];
  medications: Medication[];

  investigations: { id: string; name: string; instructions: string }[];
  additionalNotes: string;
  followUp: string;
  recommendations: {
    lifestyle: { dos: string[]; donts: string[] };
    diet: { dos: string[]; donts: string[] };
    exercises: { dos: string[]; donts: string[] };
  };
  alfaSummary?: string | null;
  alfaEncId?: string | null;
  alfaHasBeenInvoked?: boolean;
  chatMessages?: { role: 'user' | 'ai'; text: string }[];
  isAiPanelExpanded?: boolean;
  savedAt: number; // timestamp
}

// Helper to get storage key for a specific encounter
const getStorageKey = (encounterId: string) => `encounter_draft_${encounterId}`;


export default function EncounterPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id?: string };
  
  // Data loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bundle, setBundle] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<{ name: string; qualification?: string; registration?: string } | null>(null);

  // Derived state: Check if encounter is already finalized (read-only)
  const isFinalized = bundle?.encounter?.status === 'completed' || bundle?.encounter?.status === 'finalized';

  // Form State
  const [healthHistory, setHealthHistory] = useState("");
  const [vitals, setVitals] = useState<Vitals>({});
  const [enabledVitals, setEnabledVitals] = useState<VitalDefinition[]>([]);
  const [vitalDefinitions, setVitalDefinitions] = useState<VitalDefinition[]>([]);
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [investigations, setInvestigations] = useState<{ id: string; name: string; instructions: string }[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [recommendations, setRecommendations] = useState({
    lifestyle: { dos: [] as string[], donts: [] as string[] },
    diet: { dos: [] as string[], donts: [] as string[] },
    exercises: { dos: [] as string[], donts: [] as string[] }
  });

  // Lab Tests Form State
  const [testInput, setTestInput] = useState("");
  const [testInstructions, setTestInstructions] = useState("");

  // Medication form state
  const [showMedForm, setShowMedForm] = useState(false);
  const [medForm, setMedForm] = useState({
    name: "",
    dosage: "",
    duration: "",
    frequency: "",
  });

  // Alfa AI State
  const [isAlfaLoading, setIsAlfaLoading] = useState(false);
  const [alfaSummary, setAlfaSummary] = useState<string | null>(null);
  const [alfaRecommendations, setAlfaRecommendations] = useState<AlfaRecommendations | null>(null);
  const [alfaEncId, setAlfaEncId] = useState<string | null>(null);
  const [alfaHasBeenInvoked, setAlfaHasBeenInvoked] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  // Collapsible Sections State
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [isAiSummaryCollapsed, setIsAiSummaryCollapsed] = useState(false);
  const [isAiChatCollapsed, setIsAiChatCollapsed] = useState(false);
  const [isAiPanelExpanded, setIsAiPanelExpanded] = useState(false); // Controls panel visibility
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false); // Controls left panel collapse

  // Section ordering from doctor preferences
  const [sectionOrder, setSectionOrder] = useState<string[]>(['vitals', 'symptoms', 'diagnosis', 'medications', 'notes']);

  // Load encounter data and vitals config
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        
        // Fetch encounter, doctor profile, and vitals config in parallel
        const [resp, doctorResp, vitalsConfigResp] = await Promise.all([
          getEncounterDetails(id),
          getDoctorProfile().catch(() => null),
          getDoctorVitalsConfig().catch(() => null)
        ]);
        
        // Set doctor info and section order
        if (doctorResp?.data?.success) {
          const doc: any = doctorResp.data.data?.doctor || doctorResp.data.data;
          setDoctorInfo({
            name: doc?.fullName || doc?.full_name || 'Doctor',
            qualification: doc?.qualification || doc?.qualifications,
            registration: doc?.registrationNumber || doc?.registration_number || doc?.medicalRegistrationId
          });
          
          // Apply saved encounter form section order
          if (doc?.ui_preferences?.encounterFormOrder?.length) {
            setSectionOrder(doc.ui_preferences.encounterFormOrder);
          }
        }
        
        // Set vitals configuration
        if (vitalsConfigResp?.data?.data?.vitalsConfig) {
          const config = vitalsConfigResp.data.data.vitalsConfig;
          const enabled = config.filter((v: any) => v.isEnabled === true);
          setEnabledVitals(enabled);
          setVitalDefinitions(config);
        } else {
          // Fallback: fetch all vitals definitions
          try {
            const allVitals = await getVitalsDefinitions();
            setEnabledVitals(allVitals.data.data.vitals);
            setVitalDefinitions(allVitals.data.data.vitals);
          } catch {
            console.warn('Could not fetch vitals definitions');
          }
        }
        
        const api = resp.data;
        if (!api?.success) {
          setError(api?.message || "Failed to load encounter");
          return;
        }
        const b: any = api.data?.bundle;
        if (!b) {
          setError("Encounter bundle missing");
          return;
        }
        setBundle(b);
        
        // Pre-fill form with existing data
        if (b.encounterForm) {
          const form: any = b.encounterForm;
          setChiefComplaint(form.chiefComplaint || "");
          if (form.presentingSymptoms) {
            setSymptoms(form.presentingSymptoms);
          }
        }
        if (b.vitals) {
          // Map API vitals to our dynamic vitals state
          const vitalsData: any = b.vitals;
          const vitalsFromApi: Vitals = {};
          if (vitalsData.bp || vitalsData.bloodPressure) vitalsFromApi.bp = vitalsData.bp || vitalsData.bloodPressure || "";
          if (vitalsData.pulse || vitalsData.heartRate) vitalsFromApi.pulse = String(vitalsData.pulse || vitalsData.heartRate || "");
          if (vitalsData.temp || vitalsData.temperature) vitalsFromApi.temp = String(vitalsData.temp || vitalsData.temperature || "");
          if (vitalsData.weight) vitalsFromApi.weight = String(vitalsData.weight || "");
          if (vitalsData.height) vitalsFromApi.height = String(vitalsData.height || "");
          if (vitalsData.spo2 || vitalsData.spO2) vitalsFromApi.spo2 = String(vitalsData.spo2 || vitalsData.spO2 || "");
          setVitals(vitalsFromApi);
        }
      } catch (err: any) {
        console.error("Error loading encounter:", err);
        if (err?.response?.status === 401) {
          router.push("/doctor/login");
        } else if (err?.response?.status === 404) {
          setError("Appointment not found");
        } else {
          setError("Failed to load encounter data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  // localStorage: Load draft on mount (after API data is loaded)
  useEffect(() => {
    if (!id || loading || !bundle) return;
    
    try {
      const storageKey = getStorageKey(id);
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        const draft: EncounterFormDraft = JSON.parse(savedDraft);
        // Only restore if draft is reasonably recent (< 24h)
        const isRecent = Date.now() - draft.savedAt < 24 * 60 * 60 * 1000;
        if (isRecent) {
          console.log("[EncounterPage] Restoring draft from localStorage");
          if (draft.healthHistory) setHealthHistory(draft.healthHistory);
          if (draft.vitals) setVitals(draft.vitals);
          if (draft.chiefComplaint) setChiefComplaint(draft.chiefComplaint);
          if (draft.symptoms?.length) setSymptoms(draft.symptoms);
          if (draft.diagnoses?.length) setDiagnoses(draft.diagnoses);
          if (draft.medications?.length) setMedications(draft.medications);
          
          // Handle investigations (legacy string vs new array)
          if (draft.investigations) {
            if (Array.isArray(draft.investigations)) {
              setInvestigations(draft.investigations);
            } else if (typeof draft.investigations === 'string') {
              // Legacy support: append to notes or ignore
              setAdditionalNotes(prev => prev + "\nLegacy Investigations: " + draft.investigations);
              setInvestigations([]);
            }
          }
          
          if (draft.additionalNotes) setAdditionalNotes(draft.additionalNotes);
          if (draft.followUp) setFollowUp(draft.followUp);
          if (draft.recommendations) setRecommendations(draft.recommendations);
          if (draft.alfaSummary) setAlfaSummary(draft.alfaSummary);
          if (draft.alfaEncId) setAlfaEncId(draft.alfaEncId);
          if (draft.alfaHasBeenInvoked) setAlfaHasBeenInvoked(draft.alfaHasBeenInvoked);
          if (draft.chatMessages) setChatMessages(draft.chatMessages);
          if (draft.isAiPanelExpanded) setIsAiPanelExpanded(draft.isAiPanelExpanded);
        }
      }
    } catch (err) {
      console.error("[EncounterPage] Error loading draft:", err);
    }
  }, [id, loading, bundle]);

  // localStorage: Save draft on form change (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!id || loading) return;
    
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Debounce save by 1 second
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const draft: EncounterFormDraft = {
          healthHistory,
          vitals,
          chiefComplaint,
          symptoms,
          diagnoses,
          medications,
          investigations,
          additionalNotes,
          followUp,
          recommendations,
          alfaSummary,
          alfaEncId,
          alfaHasBeenInvoked,
          chatMessages,
          isAiPanelExpanded,
          savedAt: Date.now(),
        };
        localStorage.setItem(getStorageKey(id), JSON.stringify(draft));
      } catch (err) {
        console.error("[EncounterPage] Error saving draft:", err);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [id, loading, healthHistory, vitals, chiefComplaint, symptoms, diagnoses, medications, investigations, additionalNotes, followUp, recommendations, alfaSummary, alfaEncId, alfaHasBeenInvoked, chatMessages, isAiPanelExpanded]);

  // Handlers
  const addSymptom = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const addDiagnosis = () => {
    if (diagnosisInput.trim()) {
      setDiagnoses([...diagnoses, diagnosisInput.trim()]);
      setDiagnosisInput("");
    }
  };

  const removeDiagnosis = (index: number) => {
    setDiagnoses(diagnoses.filter((_, i) => i !== index));
  };

  const addMedication = () => {
    if (medForm.name.trim()) {
      setMedications([
        ...medications,
        {
          id: Date.now().toString(),
          ...medForm,
        },
      ]);
      setMedForm({ name: "", dosage: "", duration: "", frequency: "" });
      setShowMedForm(false);
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  // Lab Test Handlers
  const addTest = () => {
    if (testInput.trim()) {
      setInvestigations([
        ...investigations,
        {
          id: Date.now().toString(),
          name: testInput.trim(),
          instructions: testInstructions.trim(),
        },
      ]);
      setTestInput("");
      setTestInstructions("");
    }
  };

  const removeTest = (id: string) => {
    setInvestigations(investigations.filter((t) => t.id !== id));
  };

  const updateTest = (id: string, field: 'name' | 'instructions', value: string) => {
    setInvestigations(investigations.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const handleSubmit = async () => {
    if (!bundle?.encounter?.id) {
      toast.error("Missing encounter ID");
      return;
    }
    
    if (!chiefComplaint.trim()) {
      toast.error("Chief complaint is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const data: FinalizeEncounterRequest = {
        appointmentId: id,
        chiefComplaint,
        presentingSymptoms: symptoms,
        diagnosis: diagnoses.map(d => ({ code: "", description: d, confidence: "High" })),
        medications: medications.map(m => ({
          name: m.name,
          dosage: m.dosage,
          frequency: m.frequency,
          duration: m.duration,
          instructions: ""
        })),
        vitalSigns: {
          bloodPressure: vitals.bp || "",
          heartRate: vitals.pulse || "",
          temperature: vitals.temp || "",
          respiratoryRate: "",
          oxygenSaturation: vitals.spo2 || ""
        },
        doctorRemarks: additionalNotes,
        followUpInstructions: followUp,
        recommendations: recommendations
      };

      await finalizeEncounter(bundle.encounter.id, data);
      
      // Clear localStorage draft on successful submit
      if (id) {
        localStorage.removeItem(getStorageKey(id));
      }
      
      toast.success("Encounter submitted successfully!");
      router.push("/doctor/dashboard");
    } catch (error) {
      console.error("Error submitting encounter:", error);
      toast.error("Failed to submit encounter");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    // Check if there's content to preview
    if (medications.length === 0 && !additionalNotes.trim() && !followUp.trim()) {
      toast.error('Please add medications, notes, or follow-up instructions to preview');
      return;
    }
    setShowPreview(true);
  };

  // Alfa AI - Invoke Encounter Assessment
  const handleAlfaInvoke = async () => {
    // Always expand the AI panel when invoking
    setIsAiPanelExpanded(true);

    if (!chiefComplaint.trim()) {
      toast.error("Please enter a chief complaint first.");
      return;
    }
    if (!id) {
      toast.error("Missing encounter ID");
      return;
    }

    setIsAlfaLoading(true);
    try {
      const patient = bundle?.patient || {};
      const patientAge = patient.dateOfBirth || patient.date_of_birth
        ? Math.max(0, Math.floor((Date.now() - new Date(patient.dateOfBirth || patient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)))
        : 20;

      const complaintText = `Patient: ${patientAge}yo ${patient.gender || 'unknown'}. Chief Complaint: ${chiefComplaint}. ${symptoms.length > 0 ? `Symptoms: ${symptoms.join(', ')}.` : ''}`;
      
      const response = await invokeAlfaEncounter({
        user_id: patient.id || patient.uhid || 'unknown',
        enc_id: id,
        complaint: complaintText,
        vitals: {
          bp: vitals.bp || null,
          hr: vitals.pulse || (vitals.heartRate as string) || null,
          temp: vitals.temp || (vitals.temperature as string) || null,
          weight: vitals.weight || null,
          height: vitals.height || null,
          spo2: vitals.spo2 || (vitals.spO2 as string) || null,
        },
      });

      if (response.data) {
        const data = response.data;
        setAlfaEncId(data.enc_id);
        setAlfaSummary(data.summary || data.diagnosis);
        setAlfaRecommendations(data.recommendations);

        // Prefill Diagnosis
        if (data.diagnosis) {
          setDiagnoses([data.diagnosis]);
        }
        
        // Prefill Medications
        if (data.medications?.length) {
          setMedications(data.medications.map((m, i) => ({
            id: `alfa-${i}-${Date.now()}`,
            name: m.name,
            dosage: m.dosage || '',
            frequency: m.frequency || '',
            duration: m.duration || ''
          })));
        }
        
        // Deprecated string format
        // if (data.tests?.length) {
        //   setInvestigations(data.tests.map(t => `${t.name}${t.reason ? ` - ${t.reason}` : ''}`).join('\n'));
        // }
        // New Array Format
        if (data.tests?.length) {
            setInvestigations(data.tests.map((t, i) => ({
                id: `alfa-test-${i}-${Date.now()}`,
                name: t.name,
                instructions: t.reason || ''
            })));
        }
        
        // Populate Recommendations State
        if (data.recommendations) {
          setRecommendations({
            lifestyle: data.recommendations.lifestyle || { dos: [], donts: [] },
            diet: data.recommendations.diet || { dos: [], donts: [] },
            exercises: data.recommendations.exercises || { dos: [], donts: [] }
          });
        }

        // Expand AI panels after successful invocation
        setIsAiPanelExpanded(true);
        setAlfaHasBeenInvoked(true);

        toast.success("AI suggestions applied to form!");
      }
    } catch (err: unknown) {
      console.error("Alfa Invoke error:", err);
      toast.error("Failed to get AI suggestions. Please try again.");
    } finally {
      setIsAlfaLoading(false);
    }
  };

  // Alfa AI - Chat Handler
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    if (!alfaEncId) {
      toast.error("Please invoke Alfa AI first to start a chat session.");
      return;
    }

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const resp = await invokeAlfaChat(alfaEncId, { user_query: userMessage });
      setChatMessages(prev => [...prev, { role: 'ai', text: resp.data.answer }]);
    } catch (err) {
      console.error("Chat error:", err);
      toast.error("Chat failed. Please try again.");
      setChatMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't process your request. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8f4fc] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600">Loading encounter...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !bundle) {
    return (
      <div className="min-h-screen bg-[#e8f4fc] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error || "Encounter not found"}</p>
          <Link
            href="/doctor/opd"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Queue
          </Link>
        </div>
      </div>
    );
  }

  // Section renderer for dynamic ordering
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'vitals':
        return (
          <div key="vitals" className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Vitals</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    {enabledVitals.map((vital) => {
                      const IconComponent = iconMap[vital.icon || 'activity'] || Activity;
                      return (
                        <th key={vital.key} className="px-3 py-2 text-left first:rounded-tl-lg last:rounded-tr-lg">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                            <IconComponent className={`w-3.5 h-3.5 ${vital.color || 'text-blue-500'}`} />
                            <span>{vital.name}</span>
                            {vital.unit && <span className="text-gray-400 font-normal">({vital.unit})</span>}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    {enabledVitals.map((vital) => (
                      <td key={vital.key} className="px-2 py-2">
                        <input
                          type="text"
                          value={vitals[vital.key] || ''}
                          onChange={(e) => setVitals({ ...vitals, [vital.key]: e.target.value })}
                          disabled={isFinalized}
                          placeholder="—"
                          className="w-full min-w-[80px] px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 hover:border-blue-300 transition-colors"
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'symptoms':
        return (
          <div key="symptoms" className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Chief Complaint & Symptoms</h3>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder="Describe the chief complaint..."
              disabled={isFinalized}
              className="w-full h-20 p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100 mb-3"
            />
            
            {/* Alfa Invoke Button - Moved Below Chief Complaint */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleAlfaInvoke}
                disabled={isAlfaLoading || !chiefComplaint.trim() || isFinalized}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                  alfaHasBeenInvoked 
                    ? "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50" 
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md"
                }`}
              >
                {isAlfaLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {alfaHasBeenInvoked ? "Re-invoke Alfa AI" : "Invoke Alfa AI"}
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSymptom()}
                placeholder="Add symptom..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button onClick={addSymptom} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">Add</button>
            </div>
            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {symptoms.map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">
                    {s}
                    <button onClick={() => removeSymptom(i)} className="hover:text-cyan-900"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      case 'diagnosis':
        return (
          <div key="diagnosis" className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Diagnosis</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={diagnosisInput}
                onChange={(e) => setDiagnosisInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addDiagnosis()}
                placeholder="Add diagnosis..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button onClick={addDiagnosis} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Add</button>
            </div>
            {diagnoses.length > 0 && (
              <div className="space-y-3">
                {diagnoses.map((d, i) => (
                  <div key={i} className="relative bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div 
                        contentEditable={!isFinalized}
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newDiagnoses = [...diagnoses];
                          newDiagnoses[i] = e.currentTarget.textContent || '';
                          setDiagnoses(newDiagnoses);
                        }}
                        className="flex-1 text-sm text-red-800 leading-relaxed outline-none whitespace-pre-wrap break-words"
                      >
                        {d}
                      </div>
                      <button 
                        onClick={() => removeDiagnosis(i)} 
                        disabled={isFinalized}
                        className="flex-shrink-0 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'medications':
        return (
          <div key="medications" className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Medications</h3>
              <button onClick={() => setShowMedForm(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">Add Medication</button>
            </div>
            {showMedForm && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={medForm.name} onChange={(e) => setMedForm({ ...medForm, name: e.target.value })} placeholder="Medicine name" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  <input type="text" value={medForm.dosage} onChange={(e) => setMedForm({ ...medForm, dosage: e.target.value })} placeholder="Dosage" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  <input type="text" value={medForm.duration} onChange={(e) => setMedForm({ ...medForm, duration: e.target.value })} placeholder="Duration" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  <input type="text" value={medForm.frequency} onChange={(e) => setMedForm({ ...medForm, frequency: e.target.value })} placeholder="Frequency" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addMedication} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Save</button>
                  <button onClick={() => setShowMedForm(false)} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
                </div>
              </div>
            )}
            {medications.length > 0 && (
              <div className="space-y-2">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <span className="font-medium text-purple-900">{med.name}</span>
                      <span className="text-sm text-purple-600 ml-2">{med.dosage} • {med.frequency} • {med.duration}</span>
                    </div>
                    <button onClick={() => removeMedication(med.id)} className="text-purple-400 hover:text-purple-600"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'notes':
        return (
          <React.Fragment key="notes">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-gray-700" />
                  <h3 className="font-semibold text-gray-900">Lab Tests</h3>
                </div>
              </div>
              
              {/* Lab Tests Table */}
              {investigations.length > 0 ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-medium">
                      <tr>
                        <th className="px-4 py-2 w-1/3">Test Name</th>
                        <th className="px-4 py-2">Instructions</th>
                        <th className="px-4 py-2 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {investigations.map((test) => (
                        <tr key={test.id} className="group hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <input 
                              value={test.name}
                              onChange={(e) => updateTest(test.id, 'name', e.target.value)}
                              className="w-full bg-transparent focus:outline-none focus:underline"
                              placeholder="Test Name"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input 
                              value={test.instructions}
                              onChange={(e) => updateTest(test.id, 'instructions', e.target.value)}
                              className="w-full bg-transparent focus:outline-none focus:underline text-gray-600"
                              placeholder="Instructions (optional)"
                            />
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button 
                              onClick={() => removeTest(test.id)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm mb-3">
                  No lab tests added yet.
                </div>
              )}

              {/* Add Test Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTest()}
                  placeholder="Test Name"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={testInstructions}
                  onChange={(e) => setTestInstructions(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTest()}
                  placeholder="Instructions"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button 
                  onClick={addTest}
                  disabled={!testInput.trim()}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  Add Test
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Additional Notes</h3>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Add any additional notes..."
                className="w-full h-20 p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  const patient = bundle.patient || {};
  const patientAge = patient.dateOfBirth || patient.date_of_birth
    ? Math.max(0, Math.floor((Date.now() - new Date(patient.dateOfBirth || patient.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)))
    : 20;

  return (
    <div className="min-h-screen bg-[#e8f4fc]">
      {/* Header */}
      <header className="bg-[#e8f4fc] px-4 py-3 flex items-center justify-between border-b border-[#d0e8f5]">
        <div className="flex items-center gap-6">
          <Link
            href="/doctor/opd"
            className="flex items-center gap-1 text-red-500 font-medium hover:text-red-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Queue
          </Link>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold text-gray-900">
                {patient.fullName || patient.full_name || "Robert Wilson"}
              </p>
              <p className="text-xs text-gray-500">
                UHID: {patient.uhid || "UHID2024001"}
              </p>
            </div>
            <span className="text-gray-700">Age: {patientAge}</span>
            <span className="text-gray-700">Gender: {patient.gender || "M"}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isFinalized ? (
            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
              ✓ Encounter Finalized
            </span>
          ) : (
            <>
              {showPreview ? (
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Edit
                </button>
              ) : (
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
              )}
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : showPreview ? "Finalize Encounter" : "Submit"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-70px)]">
        {/* Left Column - Health History */}
        <div className={`flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ${isLeftPanelCollapsed ? 'w-12' : 'w-64'}`}>
          {/* Collapsed State */}
          {isLeftPanelCollapsed ? (
            <div className="flex flex-col items-center py-4 h-full">
              <button
                onClick={() => setIsLeftPanelCollapsed(false)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                title="Expand History Panel"
              >
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
              <span className="text-xs text-blue-600 mt-2 font-medium" style={{ writingMode: 'vertical-rl' }}>
                History
              </span>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-700 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  History
                </h2>
                <button
                  onClick={() => setIsLeftPanelCollapsed(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Collapse"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <Collapsible open={!isHistoryCollapsed} onOpenChange={(open) => setIsHistoryCollapsed(!open)}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg group">
                    <span className="text-sm font-medium text-gray-600">Medical History</span>
                    <ChevronsUpDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 space-y-4">
                      {bundle?.medicalHistory?.map((entry: any, i: number) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">{entry.date}</div>
                          <div className="font-medium text-gray-800 text-sm mb-1">{entry.doctor}</div>
                          <p className="text-sm text-gray-600">{entry.diagnosis}</p>
                        </div>
                      ))}
                      {(!bundle?.medicalHistory || bundle.medicalHistory.length === 0) && (
                        <div className="text-sm text-gray-400 italic p-2">No history available</div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          )}
        </div>

        {/* Middle Column - Form or Preview */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8fafc]">
          {showPreview ? (
            <div className="p-4">
              <button
                onClick={() => setShowPreview(false)}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Editor
              </button>
              <EncounterPreview
                patient={{
                  name: bundle?.patient?.name || "Unknown",
                  age: bundle?.patient?.demographics?.age,
                  gender: bundle?.patient?.demographics?.gender,
                  uhid: bundle?.patient?.uhid || "",
                }}
                vitals={vitals}
                vitalDefinitions={vitalDefinitions as any}
                enabledVitals={enabledVitals as any}
                clinicalNotes={{
                  chiefComplaint,
                  symptoms,
                  diagnosis: diagnoses.join(", "),
                  notes: additionalNotes,
                  treatmentPlan: followUp,
                }}
                medications={medications}
                labTests={investigations}
                recommendations={recommendations}
                doctorInfo={doctorInfo || undefined}
              />
            </div>
          ) : (
            <div className="p-4">
              <div className="max-w-3xl mx-auto space-y-4 pb-20">
                {/* Dynamic sections based on saved order */}
                {sectionOrder.map((sectionId) => renderSection(sectionId))}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-3">Follow Up</h3>
                    <input
                      type="date"
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Recommendations */}
                <RecommendationSection
                  recommendations={recommendations}
                  setRecommendations={setRecommendations}
                  alfaRecommendations={alfaRecommendations}
                />

                {/* Final Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Preview Prescription
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isFinalized}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Finalizing..." : isFinalized ? "Encounter Finalized" : "Finalize & Print"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - AI Panel */}
        {(isAiPanelExpanded || isAlfaLoading || alfaHasBeenInvoked) && (
          <div className={`flex-shrink-0 bg-white border-l border-gray-200 flex flex-col h-full transition-all duration-300 ${isAiPanelExpanded ? 'w-96' : 'w-12'}`}>
            {/* Collapsed State */}
            {!isAiPanelExpanded && !isAlfaLoading ? (
              <div className="flex flex-col items-center py-4 h-full">
                <button
                  onClick={() => setIsAiPanelExpanded(true)}
                  className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Expand AI Panel"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>
                <span className="text-xs text-purple-600 mt-2 font-medium" style={{ writingMode: 'vertical-rl' }}>
                  AI Assistant
                </span>
              </div>
            ) : (
              <>
                {/* AI Summary Section */}
                <div className="flex-shrink-0 max-h-[50%] flex flex-col bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 border-b-2 border-purple-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-purple-100/50 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">AI Summary</h3>
                        <p className="text-[10px] text-purple-500 font-medium">Powered by Alfa</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAiPanelExpanded(false)}
                      className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Collapse"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {isAlfaLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                    </div>
                    <span className="text-purple-600 text-sm font-medium">Analyzing patient data...</span>
                  </div>
                ) : alfaSummary ? (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{alfaSummary}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No AI summary yet</p>
                    <p className="text-gray-400 text-xs mt-1">Click "Invoke Alfa AI" to get suggestions</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-100/50 bg-white/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-sm">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Chat with Alfa</h4>
                  <p className="text-[10px] text-blue-500 font-medium">
                    {alfaEncId ? 'Online' : 'Invoke AI first to chat'}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-sm">Ask follow-up questions...</p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-sm'
                          : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                      } px-4 py-2.5`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))
                )}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white/80 backdrop-blur-sm border-t border-blue-100">
                <div className="flex gap-2 items-center bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder={alfaEncId ? "Type your question..." : "Invoke AI first..."}
                    disabled={!alfaEncId || isChatLoading}
                    className="flex-1 py-2 text-sm bg-transparent focus:outline-none placeholder:text-gray-400 disabled:text-gray-400"
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={!alfaEncId || isChatLoading || !chatInput.trim()}
                    className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Prescription Preview Modal (Removed) */}

    </div>
  );
}
