
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis, ExperienceLevel } from "../types";

export async function analyzeResume(
  resumeText: string,
  targetRole: string,
  experienceLevel: ExperienceLevel
): Promise<ResumeAnalysis> {
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey.length < 5) {
    throw new Error(
      "DEPLOYMENT ERROR: API_KEY is missing. To fix this, go to your Vercel Dashboard -> Settings -> Environment Variables and add a key named 'VITE_API_KEY' with your Gemini API value."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Act as an Enterprise-Level ATS Evaluation Engine. 
        Analyze this resume for the role: ${targetRole} (Level: ${experienceLevel}).

        RESUME TEXT:
        ${resumeText}

        REQUIREMENTS:
        - Provide deep semantic analysis.
        - Return ONLY raw JSON. No markdown backticks.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.NUMBER },
            readinessLevel: { type: Type.STRING },
            shortlistProbability: { type: Type.STRING },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                keywordMatch: { type: Type.NUMBER },
                skillsRelevance: { type: Type.NUMBER },
                experienceAlignment: { type: Type.NUMBER },
                projectImpact: { type: Type.NUMBER },
                structureFormatting: { type: Type.NUMBER },
                grammarTone: { type: Type.NUMBER }
              },
              required: ["keywordMatch", "skillsRelevance", "experienceAlignment", "projectImpact", "structureFormatting", "grammarTone"]
            },
            companyMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  matchPercentage: { type: Type.NUMBER },
                  status: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["name", "matchPercentage", "status", "reason"]
              }
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            summarySuggestion: {
              type: Type.OBJECT,
              properties: {
                current: { type: Type.STRING },
                optimized: { type: Type.STRING }
              },
              required: ["current", "optimized"]
            },
            skillOptimization: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["category", "skills"]
              }
            },
            experienceUpgrades: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  upgraded: { type: Type.STRING },
                  impactDescription: { type: Type.STRING }
                },
                required: ["original", "upgraded", "impactDescription"]
              }
            },
            futureSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            rejectionRisks: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            "atsScore", "readinessLevel", "shortlistProbability", "breakdown", 
            "companyMatches", "strengths", "weaknesses", "summarySuggestion", 
            "skillOptimization", "experienceUpgrades", "futureSkills", "rejectionRisks"
          ]
        }
      }
    });

    const rawText = response.text;
    if (!rawText) throw new Error("Empty response from AI engine.");

    const cleanJson = rawText.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanJson) as ResumeAnalysis;

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    if (error.message?.includes("404")) {
      throw new Error("MODEL_UNAVAILABLE: The Gemini 3 Flash engine is not reachable. Check your API key permissions.");
    }
    throw error;
  }
} 
