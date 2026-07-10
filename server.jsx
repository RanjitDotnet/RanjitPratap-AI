// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import { createServer as createViteServer } from "vite";
// import { GoogleGenAI, Type } from "@google/genai";
// import dotenv from "dotenv";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// // Lazy-loaded GoogleGenAI client to avoid crash if API key is not present on startup
// let aiClient: GoogleGenAI | null = null;

// function getAiClient(): GoogleGenAI | null {
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
//     console.warn("GEMINI_API_KEY is not configured. AI Assistant will operate in rich simulation mode.");
//     return null;
//   }
  
//   if (!aiClient) {
//     try {
//       aiClient = new GoogleGenAI({
//         apiKey: apiKey,
//         httpOptions: {
//           headers: {
//             'User-Agent': 'aistudio-build',
//           }
//         }
//       });
//     } catch (err) {
//       console.error("Failed to initialize GoogleGenAI:", err);
//       return null;
//     }
//   }
//   return aiClient;
// }

// // ----------------------------------------------------
// // API ENDPOINTS
// // ----------------------------------------------------

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", time: new Date().toISOString() });
// });

// // Chat with Polaris Coach
// app.post("/api/ai/chat", async (req, res) => {
//   const { messages } = req.body;
//   if (!messages || !Array.isArray(messages)) {
//     return res.status(400).json({ error: "Invalid messages array provided." });
//   }

//   const client = getAiClient();
//   const lastMessageObj = messages[messages.length - 1];
//   const userText = lastMessageObj ? lastMessageObj.text : "Hello";

//   if (!client) {
//     // Return high-quality local mock response if no API Key
//     const fallbackResponses = [
//       `I'm currently running in **Demo Mode** because a \`GEMINI_API_KEY\` is not configured in the Secrets panel. However, I can help you model your task workflow! Based on your request: "${userText}", I suggest organizing this into a focused milestone task on the Board.`,
//       `Polaris Project Coach here! In a live deployment, I would process your request: "${userText}" using Gemini. Right now, I recommend assigning this action to **Daniel Cho** (Full-Stack Developer) or scheduling it for the upcoming sprint.`,
//       `Interesting project constraints! To address "${userText}", we should review our Backlog items first and make sure our "Offline mode spike" isn't overlapping with compliance requirements.`,
//       `As your Project OS Assistant, I suggest updating the priority of our 'Auth flow rewrite' task to High to align with your focus on "${userText}".`
//     ];
//     const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
//     // Simulate network delay
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     return res.json({ text: randomResponse });
//   }

//   try {
//     // Construct simplified prompt history
//     let contextPrompt = `You are "Polaris AI Coach", a professional, highly analytical, and friendly AI Project Management Coach embedded inside the "Polaris Project OS" application.
// The user is viewing their Polaris task management workspace, which features:
// - Projects (like 'Q3 Launch Campaign' or 'Tax Compliance Review')
// - Tasks (like 'Offline mode spike', 'Auth flow rewrite', 'Tax compliance review', and 'Migrate subscription webhooks')
// - Team members (Aisha Khan - Admin, Marco Reyes - Front End, Lena Müller - Compliance, Daniel Cho - Full Stack, Priya Singh - QA, Sam O'Brien - DevOps).

// Please answer their query professionally, concisely, and with great context about project management.
// Keep responses within 2-3 short, clean paragraphs. Use markdown format. Refer to Polaris tasks, activities or project status where applicable to make it sound deeply integrated.

// Conversation History:
// `;

//     // Append last few messages
//     const recentMessages = messages.slice(-5);
//     for (const m of recentMessages) {
//       contextPrompt += `${m.sender === 'user' ? 'User' : 'Polaris AI Coach'}: ${m.text}\n`;
//     }
//     contextPrompt += `Polaris AI Coach:`;

//     const response = await client.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: contextPrompt,
//     });

//     res.json({ text: response.text || "I was able to analyze your workspace, but did not produce a written response. Try describing your project bottlenecks!" });
//   } catch (error: any) {
//     console.error("Gemini API Error in chat endpoint:", error);
//     res.status(500).json({ 
//       error: "AI Generation failed", 
//       details: error.message,
//       text: "I experienced an error connecting to my Gemini neural engine. Let me assist you offline: Let's focus on cleaning up the Todo board and checking on Aisha's open PRs!" 
//     });
//   }
// });

// // Suggest a new task based on natural language
// app.post("/api/ai/suggest-task", async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt || typeof prompt !== "string") {
//     return res.status(400).json({ error: "Missing or invalid prompt string." });
//   }

//   const client = getAiClient();
//   if (!client) {
//     // Fallback static generated task
//     const mockTask = {
//       title: prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt,
//       priority: "Medium",
//       status: "Todo",
//       notes: "AI-Suggested draft. Please assign a developer and configure a proper due date.",
//       dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
//     };
//     return res.json({ task: mockTask });
//   }

//   try {
//     const aiResponse = await client.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: `You are a project assistant in Polaris Task Management. Based on this request: "${prompt}", extract and generate a single clean Task object.
// Return ONLY a valid JSON object matching this schema. Do not write any markdown blocks (like \`\`\`json) or additional text.

// Schema:
// {
//   "title": "Clear action title",
//   "priority": "Low" | "Medium" | "High" | "Urgent",
//   "status": "Backlog" | "Todo" | "In Progress",
//   "notes": "Short bulleted details or descriptions explaining what needs to be done based on the prompt",
//   "dueDate": "YYYY-MM-DD (estimate a reasonable date in the future)"
// }`,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: {
//           type: Type.OBJECT,
//           properties: {
//             title: { type: Type.STRING },
//             priority: { type: Type.STRING, description: "Low, Medium, High, or Urgent" },
//             status: { type: Type.STRING, description: "Backlog, Todo, or In Progress" },
//             notes: { type: Type.STRING },
//             dueDate: { type: Type.STRING, description: "YYYY-MM-DD format" }
//           },
//           required: ["title", "priority", "status", "notes", "dueDate"]
//         }
//       }
//     });

//     const textOutput = aiResponse.text?.trim() || "";
//     const parsedTask = JSON.parse(textOutput);
//     res.json({ task: parsedTask });
//   } catch (error: any) {
//     console.error("Gemini API Error in task-suggest endpoint:", error);
//     // Return high-quality backup structure in case parsing/API fails
//     const backupTask = {
//       title: prompt.length > 55 ? prompt.substring(0, 52) + "..." : prompt,
//       priority: "High",
//       status: "Todo",
//       notes: "Auto-drafted backlog task. Ready for sprint planning review.",
//       dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
//     };
//     res.json({ task: backupTask });
//   }
// });

// // ----------------------------------------------------
// // BOOTSTRAP EXTRAS & VITE MIDDLEWARE
// // ----------------------------------------------------

// async function startServer() {
//   if (process.env.NODE_ENV !== "production") {
//     // Development Mode
//     const vite = await createViteServer({
//       server: { 
//         middlewareMode: true,
//         host: "0.0.0.0",
//         port: PORT
//       },
//       appType: "spa",
//     });
    
//     // Serve client files via Vite
//     app.use(vite.middlewares);
//     console.log("Vite development middleware loaded.");
//   } else {
//     // Production Mode
//     const distPath = path.join(process.cwd(), 'dist');
//     app.use(express.static(distPath));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(distPath, 'index.html'));
//     });
//     console.log(`Serving static production files from ${distPath}`);
//   }

//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server successfully started. Running on port ${PORT}`);
//   });
// }

// startServer();


//** corrected code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "dist");

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client to avoid crash if API key is not present on startup
let aiClient = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("GEMINI_API_KEY is not configured. AI Assistant will operate in rich simulation mode.");
    return null;
  }
  
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI:", err);
      return null;
    }
  }
  return aiClient;
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chat with Polaris Coach
app.post("/api/ai/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array provided." });
  }

  const client = getAiClient();
  const lastMessageObj = messages[messages.length - 1];
  const userText = lastMessageObj ? lastMessageObj.text : "Hello";

  if (!client) {
    // Return high-quality local mock response if no API Key
    const fallbackResponses = [
      `I'm currently running in **Demo Mode** because a \`GEMINI_API_KEY\` is not configured in the Secrets panel. However, I can help you model your task workflow! Based on your request: "${userText}", I suggest organizing this into a focused milestone task on the Board.`,
      `Polaris Project Coach here! In a live deployment, I would process your request: "${userText}" using Gemini. Right now, I recommend assigning this action to **Daniel Cho** (Full-Stack Developer) or scheduling it for the upcoming sprint.`,
      `Interesting project constraints! To address "${userText}", we should review our Backlog items first and make sure our "Offline mode spike" isn't overlapping with compliance requirements.`,
      `As your Project OS Assistant, I suggest updating the priority of our 'Auth flow rewrite' task to High to align with your focus on "${userText}".`
    ];
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return res.json({ text: randomResponse });
  }

  try {
    // Construct simplified prompt history
    let contextPrompt = `You are "Polaris AI Coach", a professional, highly analytical, and friendly AI Project Management Coach embedded inside the "Polaris Project OS" application.
The user is viewing their Polaris task management workspace, which features:
- Projects (like 'Q3 Launch Campaign' or 'Tax Compliance Review')
- Tasks (like 'Offline mode spike', 'Auth flow rewrite', 'Tax compliance review', and 'Migrate subscription webhooks')
- Team members (Aisha Khan - Admin, Marco Reyes - Front End, Lena Müller - Compliance, Daniel Cho - Full Stack, Priya Singh - QA, Sam O'Brien - DevOps).

Please answer their query professionally, concisely, and with great context about project management.
Keep responses within 2-3 short, clean paragraphs. Use markdown format. Refer to Polaris tasks, activities or project status where applicable to make it sound deeply integrated.

Conversation History:
`;

    // Append last few messages
    const recentMessages = messages.slice(-5);
    for (const m of recentMessages) {
      contextPrompt += `${m.sender === 'user' ? 'User' : 'Polaris AI Coach'}: ${m.text}\n`;
    }
    contextPrompt += `Polaris AI Coach:`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
    });

    res.json({ text: response.text || "I was able to analyze your workspace, but did not produce a written response. Try describing your project bottlenecks!" });
  } catch (error) {
    console.error("Gemini API Error in chat endpoint:", error);
    res.status(500).json({ 
      error: "AI Generation failed", 
      details: error.message,
      text: "I experienced an error connecting to my Gemini neural engine. Let me assist you offline: Let's focus on cleaning up the Todo board and checking on Aisha's open PRs!" 
    });
  }
});

// Suggest a new task based on natural language
app.post("/api/ai/suggest-task", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing or invalid prompt string." });
  }

  const client = getAiClient();
  if (!client) {
    // Fallback static generated task
    const mockTask = {
      title: prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt,
      priority: "Medium",
      status: "Todo",
      notes: "AI-Suggested draft. Please assign a developer and configure a proper due date.",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    return res.json({ task: mockTask });
  }

  try {
    const aiResponse = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are a project assistant in Polaris Task Management. Based on this request: "${prompt}", extract and generate a single clean Task object.
Return ONLY a valid JSON object matching this schema. Do not write any markdown blocks (like \`\`\`json) or additional text.

Schema:
{
  "title": "Clear action title",
  "priority": "Low" | "Medium" | "High" | "Urgent",
  "status": "Backlog" | "Todo" | "In Progress",
  "notes": "Short bulleted details or descriptions explaining what needs to be done based on the prompt",
  "dueDate": "YYYY-MM-DD (estimate a reasonable date in the future)"
}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            priority: { type: Type.STRING, description: "Low, Medium, High, or Urgent" },
            status: { type: Type.STRING, description: "Backlog, Todo, or In Progress" },
            notes: { type: Type.STRING },
            dueDate: { type: Type.STRING, description: "YYYY-MM-DD format" }
          },
          required: ["title", "priority", "status", "notes", "dueDate"]
        }
      }
    });

    const textOutput = aiResponse.text?.trim() || "";
    const parsedTask = JSON.parse(textOutput);
    res.json({ task: parsedTask });
  } catch (error) {
    console.error("Gemini API Error in task-suggest endpoint:", error);
    // Return high-quality backup structure in case parsing/API fails
    const backupTask = {
      title: prompt.length > 55 ? prompt.substring(0, 52) + "..." : prompt,
      priority: "High",
      status: "Todo",
      notes: "Auto-drafted backlog task. Ready for sprint planning review.",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    res.json({ task: backupTask });
  }
});

// ----------------------------------------------------
// BOOTSTRAP EXTRAS & VITE MIDDLEWARE
// ----------------------------------------------------



process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});



async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: "0.0.0.0",
        port: PORT
      },
      appType: "spa",
    });
    
    // Serve client files via Vite
    app.use(vite.middlewares);
    console.log("Vite development middleware loaded.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static production files from ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started. Running on port ${PORT}`);
  });
}

startServer();

