import { GoogleGenAI, GenerateContentParameters, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface WorkoutDay {
  dayName: string;
  workoutTitle: string;
  isRestDay: boolean;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    targetMuscle: string;
    equipmentReq: string;
  }[];
}

export interface WeeklyPlan {
  name: string;
  splitType: string;
  description: string;
  days: WorkoutDay[];
}

export const geminiService = {
  async generateWorkoutPlan(profile: any, prompt?: string): Promise<WeeklyPlan> {
    const defaultPrompt = `Generate a science-based weekly workout plan for a ${profile.experienceLevel} level user aiming for '${profile.fitnessGoal}'. 
    Workout Frequency: ${profile.workoutFrequency} days per week.
    Preferred Split: ${profile.preferredSplit}.
    Available equipment: ${profile.availableEquipment?.join(", ") || "Bodyweight only"}.
    Ensure sets and reps follow hypertrophy (6-12 reps) or strength (1-5 reps) science based on the goal.
    Include rest days to total exactly 7 days in the plan.
    User concerns/notes: ${prompt || "None"}.
    Return exactly one WeeklyPlan JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: defaultPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            splitType: { type: Type.STRING },
            description: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayName: { type: Type.STRING },
                  workoutTitle: { type: Type.STRING },
                  isRestDay: { type: Type.BOOLEAN },
                  exercises: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        sets: { type: Type.NUMBER },
                        reps: { type: Type.STRING },
                        rest: { type: Type.STRING },
                        targetMuscle: { type: Type.STRING },
                        equipmentReq: { type: Type.STRING },
                      },
                      required: ["name", "sets", "reps"]
                    }
                  }
                },
                required: ["dayName", "workoutTitle", "isRestDay"]
              }
            }
          },
          required: ["name", "days"]
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse weekly plan JSON", e);
      throw new Error("Failed to generate weekly plan");
    }
  },

  async chatWithCoach(messages: { role: "user" | "model"; content: string; imageUrl?: string }[]): Promise<string> {
    // Handle image-based physique analysis if the last message has an image
    const lastMessage = messages[messages.length - 1];
    
    const contents = messages.map(msg => {
      if (msg.imageUrl) {
        return {
          role: msg.role === "user" ? "user" : "model",
          parts: [
            { text: msg.content },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: msg.imageUrl.split(",")[1] || msg.imageUrl
              }
            }
          ]
        };
      }
      return {
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: "You are Joni, an expert AI Fitness Coach. You provide advice on diet, workout, and physique analysis. Be motivating, scientific, and concise. When analyzing physique images, look at muscle definition, symmetry, and posture provided the user asks for analysis."
      }
    });

    return response.text;
  }
};
