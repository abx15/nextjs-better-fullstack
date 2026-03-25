"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SchemeCard from "@/components/sarkari/scheme-card";
import AITypingIndicator from "@/components/sarkari/ai-typing";
import EmptyState from "@/components/sarkari/empty-state";

export default function SchemeFinderPage() {
  // All useState hooks must be called first
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedBenefitType, setSelectedBenefitType] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiMatching, setAiMatching] = useState(false);
  const [mounted, setMounted] = useState(false);

  // All functions must be defined before useEffect
  const loadSchemes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        state: selectedState,
        difficulty: selectedDifficulty.join(","),
        benefitType: selectedBenefitType.join(","),
        level: selectedLevel.join(","),
        search: searchQuery,
      });

      const response = await fetch(`/api/schemes/search?${params}`);
      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (error) {
      console.error("Failed to fetch schemes:", error);
      // Mock data for demo
      setSchemes([
        {
          id: 1,
          nameHindi: "पीएम-किसान सम्मान निधि",
          nameEnglish: "PM-KISAN Samman Nidhi",
          category: "kisan",
          ministry: "कृषि एवं किसान कल्याण मंत्रालय",
          benefitAmount: "₹6,000/साल",
          difficulty: "easy",
          matchPercent: 95,
          docsReady: 2,
          docsNeeded: 1,
          isSaved: false,
        },
        {
          id: 2,
          nameHindi: "आयुष्मान भारत",
          nameEnglish: "Ayushman Bharat",
          category: "swasthya",
          ministry: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
          benefitAmount: "₹5 लाख/साल",
          difficulty: "medium",
          matchPercent: 88,
          docsReady: 1,
          docsNeeded: 2,
          isSaved: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAIMatching = async () => {
    setAiMatching(true);
    try {
      const response = await fetch("/api/schemes/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (error) {
      console.error("AI matching failed:", error);
    } finally {
      setAiMatching(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedState("all");
    setSelectedDifficulty([]);
    setSelectedBenefitType([]);
    setSelectedLevel([]);
    setSearchQuery("");
  };

  const toggleFilter = (filterArray: string[], value: string, setter: (val: string[]) => void) => {
    if (filterArray.includes(value)) {
      setter(filterArray.filter((item) => item !== value));
    } else {
      setter([...filterArray, value]);
    }
  };

  // useEffect must be called after all useState hooks and functions
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load schemes when dependencies change
  useEffect(() => {
    if (mounted) {
      loadSchemes();
    }
  }, [mounted, selectedCategory, selectedState, selectedDifficulty, selectedBenefitType, selectedLevel, searchQuery]);

  const categories = [
    { id: "kisan", label: "किसान", icon: "🌾" },
    { id: "shiksha", label: "शिक्षा", icon: "🎓" },
    { id: "swasthya", label: "स्वास्थ्य", icon: "🏥" },
    { id: "awas", label: "आवास", icon: "🏠" },
    { id: "rojgar", label: "रोजगार", icon: "💼" },
    { id: "mahila", label: "महिला", icon: "👩" },
    { id: "vridh", label: "वृद्ध", icon: "👴" },
    { id: "divyang", label: "दिव्यांग", icon: "♿" },
  ];

  const states = [
    "उत्तर प्रदेश",
    "बिहार",
    "मध्य प्रदेश",
    "राजस्थान",
    "दिल्ली",
    "महाराष्ट्र",
    "पंजाब",
    "गुजरात",
  ];

  const difficulties = [
    { id: "easy", label: "आसान" },
    { id: "medium", label: "मध्यम" },
    { id: "hard", label: "कठिन" },
  ];

  const benefitTypes = [
    { id: "cash", label: "नकद" },
    { id: "subsidy", label: "सब्सिडी" },
    { id: "loan", label: "लोन" },
    { id: "insurance", label: "बीमा" },
  ];

  const levels = [
    { id: "central", label: "केंद्रीय" },
    { id: "state", label: "राज्य" },
  ];

  // Early return after all hooks are defined
  if (!mounted) return null;

  return (
    <div className="flex gap-6">
      {/* LEFT PANEL - Filters */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-6 space-y-4">
          {/* Search */}
          <Card className="p-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <Input
                placeholder="योजना खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">श्रेणियां</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#FF6B00] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="block text-lg mb-1">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </Card>

          {/* State Filter */}
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">राज्य फ़िल्टर</h3>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="all">सभी राज्य</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </Card>

          {/* Difficulty */}
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">कठिनाई</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => toggleFilter(selectedDifficulty, diff.id, setSelectedDifficulty)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedDifficulty.includes(diff.id)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Benefit Type */}
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">लाभ प्रकार</h3>
            <div className="flex flex-wrap gap-2">
              {benefitTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleFilter(selectedBenefitType, type.id, setSelectedBenefitType)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedBenefitType.includes(type.id)
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Level */}
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">स्तर</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => toggleFilter(selectedLevel, level.id, setSelectedLevel)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedLevel.includes(level.id)
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            🔄 Filter साफ़ करें
          </Button>

          {/* AI Matching */}
          <Button
            onClick={handleAIMatching}
            disabled={aiMatching}
            className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90"
          >
            {aiMatching ? (
              <>
                <AITypingIndicator />
                <span className="ml-2">AI Matching...</span>
              </>
            ) : (
              "🤖 AI से Match करें"
            )}
          </Button>
        </div>
      </div>

      {/* RIGHT PANEL - Results */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1a3a6b]">
              आपके लिए {schemes.length} योजनाएं मिलीं
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {searchQuery && `"${searchQuery}" के लिए परिणाम`}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort:</span>
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm">
              <option>Relevance ▼</option>
              <option>Benefit</option>
              <option>Deadline</option>
              <option>Difficulty</option>
            </select>
          </div>
        </div>

        {/* AI Matching Loading State */}
        {aiMatching && (
          <Card className="p-8 mb-6 text-center">
            <AITypingIndicator />
            <h3 className="text-lg font-semibold text-[#1a3a6b] mt-4">
              AI आपकी profile देख रहा है...
            </h3>
            <p className="text-gray-600 mt-2">
              योजनाएं match हो रही हैं...
            </p>
          </Card>
        )}

        {/* Loading State */}
        {loading && !aiMatching && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </Card>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!loading && !aiMatching && schemes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                nameHindi={scheme.nameHindi}
                nameEnglish={scheme.nameEnglish}
                category={scheme.category}
                ministry={scheme.ministry}
                benefitAmount={scheme.benefitAmount}
                difficulty={scheme.difficulty}
                matchPercent={scheme.matchPercent}
                docsReady={scheme.docsReady}
                docsNeeded={scheme.docsNeeded}
                isSaved={scheme.isSaved}
                onSave={() => console.log("Save scheme:", scheme.id)}
                onDetails={() => console.log("View details:", scheme.id)}
                onApply={() => console.log("Apply for scheme:", scheme.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !aiMatching && schemes.length === 0 && (
          <EmptyState
            icon="🔍"
            titleHindi="कोई योजना नहीं मिली"
            descriptionHindi="Filter बदलें या AI से match करें"
            actionLabel="🤖 AI से match करें"
            onAction={handleAIMatching}
          />
        )}

        {/* Load More */}
        {schemes.length > 0 && !loading && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Schemes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
