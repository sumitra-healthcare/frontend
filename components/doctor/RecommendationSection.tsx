import React, { useState } from "react";
import { Plus, X, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationCategory {
  dos: string[];
  donts: string[];
}

interface RecommendationsState {
  lifestyle: RecommendationCategory;
  diet: RecommendationCategory;
  exercises: RecommendationCategory;
}

interface RecommendationSectionProps {
  recommendations: RecommendationsState;
  setRecommendations: (recommendations: RecommendationsState) => void;
  alfaRecommendations?: any | null;
}

type TabType = 'lifestyle' | 'diet' | 'exercises';

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendations,
  setRecommendations,
  alfaRecommendations,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('lifestyle');
  const [doInput, setDoInput] = useState("");
  const [dontInput, setDontInput] = useState("");

  const activeData = recommendations[activeTab];

  const handleUpdate = (updates: Partial<RecommendationCategory>) => {
    setRecommendations({
      ...recommendations,
      [activeTab]: { ...activeData, ...updates }
    });
  };

  const handleAddDo = () => {
    if (doInput.trim()) {
      handleUpdate({ dos: [...(activeData.dos || []), doInput.trim()] });
      setDoInput("");
    }
  };

  const handleAddDont = () => {
    if (dontInput.trim()) {
      handleUpdate({ donts: [...(activeData.donts || []), dontInput.trim()] });
      setDontInput("");
    }
  };

  const removeDo = (index: number) => {
    const newDos = [...(activeData.dos || [])];
    newDos.splice(index, 1);
    handleUpdate({ dos: newDos });
  };

  const removeDont = (index: number) => {
    const newDonts = [...(activeData.donts || [])];
    newDonts.splice(index, 1);
    handleUpdate({ donts: newDonts });
  };

  const applyAiSuggestions = () => {
    if (!alfaRecommendations) return;
    const suggestion = alfaRecommendations[activeTab]; 
    if (suggestion) {
       setRecommendations({
         ...recommendations,
         [activeTab]: {
            dos: [...new Set([...activeData.dos, ...(suggestion.dos || [])])],
            donts: [...new Set([...activeData.donts, ...(suggestion.donts || [])])]
         }
       });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header & Tabs */}
      <div className="border-b border-gray-200 bg-gray-50/50">
        <div className="p-4 pb-0">
          <h3 className="font-semibold text-gray-900 mb-4">Patient Recommendations</h3>
          <div className="flex gap-1">
            {(['lifestyle', 'diet', 'exercises'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2",
                  activeTab === tab
                    ? "bg-white border-blue-600 text-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                {tab === 'lifestyle' && "Lifestyle"}
                {tab === 'diet' && "Diet"}
                {tab === 'exercises' && "Exercises"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {alfaRecommendations && alfaRecommendations[activeTab] && (
            <div className="mb-4 p-2 bg-purple-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-700 text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Suggestions available for {activeTab}</span>
                </div>
                <button 
                  onClick={applyAiSuggestions}
                  className="px-3 py-1 bg-white text-purple-700 text-xs font-medium border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
                >
                    Apply All
                </button>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dos Column */}
          <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-3 text-green-700 font-semibold text-sm uppercase tracking-wide">
              <ThumbsUp className="w-4 h-4" />
              <span>Dos</span>
            </div>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={doInput}
                onChange={(e) => setDoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddDo()}
                placeholder={`Add ${activeTab} recommendation...`}
                className="flex-1 px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white"
              />
              <button
                onClick={handleAddDo}
                disabled={!doInput.trim()}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
              {activeData.dos?.map((item, idx) => (
                <div key={`do-${idx}`} className="group flex items-start justify-between bg-white p-2.5 rounded-lg border border-green-100 shadow-sm">
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  <button onClick={() => removeDo(idx)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(!activeData.dos || activeData.dos.length === 0) && (
                <p className="text-xs text-gray-400 italic text-center py-4">No recommendations added</p>
              )}
            </div>
          </div>

          {/* Donts Column */}
          <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 mb-3 text-red-700 font-semibold text-sm uppercase tracking-wide">
              <ThumbsDown className="w-4 h-4" />
              <span>Don'ts</span>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={dontInput}
                onChange={(e) => setDontInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddDont()}
                placeholder={`Add ${activeTab} restriction...`}
                className="flex-1 px-3 py-2 text-sm border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
              />
              <button
                onClick={handleAddDont}
                disabled={!dontInput.trim()}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
              {activeData.donts?.map((item, idx) => (
                <div key={`dont-${idx}`} className="group flex items-start justify-between bg-white p-2.5 rounded-lg border border-red-100 shadow-sm">
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  <button onClick={() => removeDont(idx)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(!activeData.donts || activeData.donts.length === 0) && (
                <p className="text-xs text-gray-400 italic text-center py-4">No restrictions added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
