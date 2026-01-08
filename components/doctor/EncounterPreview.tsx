"use client";

import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Activity, 
  FileText, 
  Pill, 
  FlaskConical, 
  Stethoscope,
  Calendar,
  Heart,
  Thermometer,
  Scale,
  Wind,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Dumbbell,
  Utensils,
  Sparkles
} from "lucide-react";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration?: string;
  instructions?: string;
}

interface VitalDefinition {
  key: string;
  label: string;
  unit?: string;
  icon?: string;
}

interface RecommendationCategory {
  dos: string[];
  donts: string[];
}

interface Recommendations {
  lifestyle: RecommendationCategory;
  diet: RecommendationCategory;
  exercises: RecommendationCategory;
}

interface EncounterPreviewProps {
  patient: {
    name: string;
    uhid: string;
    age?: number;
    gender?: string | null;
  };
  vitals?: Record<string, string | number>;
  vitalDefinitions?: VitalDefinition[];
  enabledVitals?: VitalDefinition[];
  clinicalNotes: {
    chiefComplaint: string;
    symptoms?: string[];
    diagnosis: string;
    treatmentPlan: string;
    notes?: string;
  };
  medications: string | Medication[];
  labTests?: { name: string; instructions: string }[];
  recommendations?: Recommendations;
  doctorInfo?: {
    name: string;
    qualification?: string;
    registration?: string;
  };
}

// Icon mapping for vitals
const vitalIcons: Record<string, React.ReactNode> = {
  bp: <Heart className="w-4 h-4" />,
  pulse: <Activity className="w-4 h-4" />,
  temp: <Thermometer className="w-4 h-4" />,
  weight: <Scale className="w-4 h-4" />,
  spo2: <Wind className="w-4 h-4" />,
};

export default function EncounterPreview({
  patient,
  vitals,
  vitalDefinitions = [],
  enabledVitals = [],
  clinicalNotes,
  medications,
  labTests = [],
  recommendations,
  doctorInfo,
}: EncounterPreviewProps) {
  // Don't split long diagnosis text - keep as array of entries
  // Each entry can be long AI-generated text
  const diagnosisList = clinicalNotes.diagnosis
    ? [clinicalNotes.diagnosis] // Keep as single entry to preserve formatting
    : [];

  const vitalsToShow = enabledVitals.length > 0 ? enabledVitals : vitalDefinitions;
  const hasVitals = vitals && vitalsToShow.some(def => vitals[def.key]);
  const hasMedications = medications && (Array.isArray(medications) ? medications.length > 0 : medications.length > 0);
  const hasLabTests = labTests && labTests.length > 0;
  
  // Check if recommendations have any content
  const hasRecommendations = recommendations && (
    recommendations.lifestyle.dos.length > 0 || recommendations.lifestyle.donts.length > 0 ||
    recommendations.diet.dos.length > 0 || recommendations.diet.donts.length > 0 ||
    recommendations.exercises.dos.length > 0 || recommendations.exercises.donts.length > 0
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Prescription Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-8 py-6 rounded-t-2xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">AlphaCare</h1>
                <p className="text-blue-100 text-sm">Digital Prescription</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            {doctorInfo?.name && (
              <p className="font-semibold">{doctorInfo.name}</p>
            )}
            {doctorInfo?.qualification && (
              <p className="text-blue-100 text-xs">{doctorInfo.qualification}</p>
            )}
            {doctorInfo?.registration && (
              <p className="text-blue-200 text-xs">Reg: {doctorInfo.registration}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Patient Information */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-base">Patient Information</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Name</p>
              <p className="font-semibold text-slate-900">{patient.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">UHID</p>
              <p className="font-mono text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 inline-block text-sm">{patient.uhid}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Age</p>
              <p className="font-semibold text-slate-900">{patient.age ? `${patient.age} Years` : "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Gender</p>
              <p className="font-semibold text-slate-900 capitalize">{patient.gender || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Vitals Section */}
        {hasVitals && (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h2 className="font-semibold text-base">Vitals</h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {vitalsToShow.map((def) => {
                const value = vitals?.[def.key];
                if (!value) return null;
                return (
                  <div 
                    key={def.key} 
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-100 text-center"
                  >
                    <div className="w-7 h-7 rounded-md bg-white shadow-sm mx-auto mb-2 flex items-center justify-center text-emerald-600">
                      {vitalIcons[def.key] || <Activity className="w-3.5 h-3.5" />}
                    </div>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500">
                      {def.label}
                      {def.unit && <span className="text-slate-400 ml-1">{def.unit}</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Clinical Notes Section */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 mb-4">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-base">Clinical Notes</h2>
          </div>
          
          <div className="space-y-5">
            {/* Chief Complaint */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                <h3 className="font-medium text-slate-800 text-sm">Chief Complaint</h3>
              </div>
              <p className="text-slate-700 bg-purple-50/50 px-4 py-3 rounded-lg border border-purple-100 text-sm">
                {clinicalNotes.chiefComplaint || <span className="text-slate-400 italic">Not recorded</span>}
              </p>
            </div>

            {/* Symptoms */}
            {clinicalNotes.symptoms && clinicalNotes.symptoms.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="font-medium text-slate-800 text-sm">Presenting Symptoms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {clinicalNotes.symptoms.map((symptom, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-full text-sm border border-amber-200"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnosis */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                <h3 className="font-medium text-slate-800 text-sm">Diagnosis</h3>
              </div>
              {diagnosisList.length > 0 && diagnosisList[0] ? (
                <div className="space-y-2">
                  {diagnosisList.map((d, i) => (
                    <div 
                      key={i} 
                      className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">{d}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-sm">No diagnosis entered</p>
              )}
            </div>

            {/* Additional Notes */}
            {clinicalNotes.notes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                  <h3 className="font-medium text-slate-800 text-sm">Additional Notes</h3>
                </div>
                <p className="text-slate-700 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 text-sm">
                  {clinicalNotes.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Medications Section */}
        {hasMedications && (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <Pill className="w-5 h-5 text-rose-600" />
              <h2 className="font-semibold text-base">Prescription</h2>
              <span className="ml-auto text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-medium">Rx</span>
            </div>
            
            {Array.isArray(medications) ? (
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-50">
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">#</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Medicine</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Dosage</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Frequency</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {medications.map((med, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-3 py-3 text-slate-500 font-medium">{i + 1}</td>
                        <td className="px-3 py-3 font-semibold text-slate-900">{med.name}</td>
                        <td className="px-3 py-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
                            {med.dosage}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-700">{med.frequency}</td>
                        <td className="px-3 py-3 text-slate-600">{med.duration || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 text-slate-800 text-sm">
                {medications}
              </div>
            )}
          </div>
        )}

        {/* Lab Tests Section */}
        {hasLabTests && (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <FlaskConical className="w-5 h-5 text-cyan-600" />
              <h2 className="font-semibold text-base">Lab Tests Ordered</h2>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-50 to-slate-50">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-1/3">Test Name</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Special Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {labTests.map((test, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-3 py-3 font-semibold text-slate-900">{test.name}</td>
                      <td className="px-3 py-3 text-slate-600">{test.instructions || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {hasRecommendations && (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-4">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-base">Patient Recommendations</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Lifestyle */}
              {(recommendations!.lifestyle.dos.length > 0 || recommendations!.lifestyle.donts.length > 0) && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-medium text-slate-800 text-sm">Lifestyle</h3>
                  </div>
                  {recommendations!.lifestyle.dos.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-green-700 font-medium mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Do's
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.lifestyle.dos.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-green-50 px-2 py-1 rounded border-l-2 border-green-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recommendations!.lifestyle.donts.length > 0 && (
                    <div>
                      <p className="text-xs text-red-700 font-medium mb-1.5 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Don'ts
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.lifestyle.donts.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-red-50 px-2 py-1 rounded border-l-2 border-red-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Diet */}
              {(recommendations!.diet.dos.length > 0 || recommendations!.diet.donts.length > 0) && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="w-4 h-4 text-orange-600" />
                    <h3 className="font-medium text-slate-800 text-sm">Diet</h3>
                  </div>
                  {recommendations!.diet.dos.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-green-700 font-medium mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Do's
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.diet.dos.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-green-50 px-2 py-1 rounded border-l-2 border-green-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recommendations!.diet.donts.length > 0 && (
                    <div>
                      <p className="text-xs text-red-700 font-medium mb-1.5 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Don'ts
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.diet.donts.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-red-50 px-2 py-1 rounded border-l-2 border-red-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Exercises */}
              {(recommendations!.exercises.dos.length > 0 || recommendations!.exercises.donts.length > 0) && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="w-4 h-4 text-teal-600" />
                    <h3 className="font-medium text-slate-800 text-sm">Exercises</h3>
                  </div>
                  {recommendations!.exercises.dos.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-green-700 font-medium mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Do's
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.exercises.dos.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-green-50 px-2 py-1 rounded border-l-2 border-green-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {recommendations!.exercises.donts.length > 0 && (
                    <div>
                      <p className="text-xs text-red-700 font-medium mb-1.5 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Don'ts
                      </p>
                      <ul className="space-y-1">
                        {recommendations!.exercises.donts.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 bg-red-50 px-2 py-1 rounded border-l-2 border-red-400">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Follow-up Section */}
        {clinicalNotes.treatmentPlan && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-700 mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-base">Follow-up Date</h2>
            </div>
            <p className="text-slate-800 font-medium text-lg">{clinicalNotes.treatmentPlan}</p>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Important</p>
            <p className="text-amber-700 mt-1">
              This is a computer-generated prescription. Please follow the dosage instructions carefully 
              and consult your doctor if you experience any adverse effects.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-100 px-8 py-4 rounded-b-2xl border-t border-slate-200 mt-4">
        <div className="flex justify-between items-center text-sm text-slate-500">
          <p>Generated by AlphaCare Digital Health Platform</p>
          <p>{new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
