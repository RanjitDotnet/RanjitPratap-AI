// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useRef, useEffect } from "react";
// import { ChatMessage, Task, Project, TeamMember } from "../types";
// import { Sparkles, Send, Bot, User, PlusCircle, AlertCircle, HelpCircle } from "lucide-react";

// interface AiAssistantViewProps {
//   projects: Project[];
//   team: TeamMember[];
//   onAddTask: (task: Omit<Task, "id">) => void;
// }

// export default function AiAssistantView({ projects, team, onAddTask }: AiAssistantViewProps) {
//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: "init",
//       sender: "assistant",
//       text: "Hello! I am your **Polaris Project Assistant** powered by Gemini. Ask me about your active tasks, campaign status, workspace bottlenecks, or use the **AI Task Drafter** on the right to auto-draft real structured tasks using natural language!",
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   // Task Drafter States
//   const [naturalLanguagePrompt, setNaturalLanguagePrompt] = useState("");
//   const [isDrafting, setIsDrafting] = useState(false);
//   const [suggestedTask, setSuggestedTask] = useState<{
//     title: string;
//     priority: Task["priority"];
//     status: Task["status"];
//     notes: string;
//     dueDate: string;
//   } | null>(null);

//   const [draftProject, setDraftProject] = useState(projects[0]?.id || "");
//   const [draftAssignee, setDraftAssignee] = useState(team[0]?.id || "");

//   const chatEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const handleSendChat = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;

//     const userMsg: ChatMessage = {
//       id: Date.now().toString(),
//       sender: "user",
//       text: chatInput,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setChatInput("");
//     setIsTyping(true);

//     try {
//       const response = await fetch("/api/ai/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: [...messages, userMsg] }),
//       });
//       const data = await response.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           sender: "assistant",
//           text: data.text || "I processed your request, but wasn't able to compile a clear reply. Let me review your dashboard metrics instead!",
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ]);
//     } catch (err) {
//       console.error("AI chat error:", err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           sender: "assistant",
//           text: "I experienced a minor connection latency while processing this prompt. Please check your network or try again!",
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleSuggestTask = async () => {
//     if (!naturalLanguagePrompt.trim()) return;
//     setIsDrafting(true);
//     setSuggestedTask(null);

//     try {
//       const response = await fetch("/api/ai/suggest-task", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: naturalLanguagePrompt }),
//       });
//       const data = await response.json();
//       if (data.task) {
//         setSuggestedTask(data.task);
//       }
//     } catch (err) {
//       console.error("Task suggest error:", err);
//     } finally {
//       setIsDrafting(false);
//     }
//   };

//   const handleAddDraftedTask = () => {
//     if (!suggestedTask) return;
    
//     onAddTask({
//       title: suggestedTask.title,
//       status: suggestedTask.status,
//       priority: suggestedTask.priority,
//       dueDate: suggestedTask.dueDate,
//       assigneeId: draftAssignee,
//       projectId: draftProject,
//       notes: suggestedTask.notes,
//     });

//     // Notify user in chat
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         sender: "assistant",
//         text: `🚀 **Success!** I have formulated and appended your drafted task: **"${suggestedTask.title}"** to your team's Tasks board!`,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       }
//     ]);

//     setSuggestedTask(null);
//     setNaturalLanguagePrompt("");
//   };

//   return (
//     <div id="ai-assistant-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto py-2">
      
//       {/* Column 1: Chat interface (Left, 7 columns) */}
//       <div className="lg:col-span-7 bg-[#0b0f19] border border-[#151c2d] rounded-xl flex flex-col h-[calc(100vh-140px)] shadow-xl overflow-hidden">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-[#151c2d] flex items-center justify-between bg-gradient-to-r from-blue-950/20 to-purple-950/20">
//           <div className="flex items-center space-x-2.5">
//             <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
//               <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-white font-display">Polaris Copilot Coach</h3>
//               <p className="text-[10px] text-gray-500 font-mono">Powered by Gemini 3.5 Flash</p>
//             </div>
//           </div>
//           <span className="bg-[#121c32] text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-500/20">
//             Realtime AI
//           </span>
//         </div>

//         {/* Message feed */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
//           {messages.map((m) => {
//             const isBot = m.sender === "assistant";
//             return (
//               <div
//                 key={m.id}
//                 id={`chat-msg-${m.id}`}
//                 className={`flex items-start space-x-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse space-x-reverse"}`}
//               >
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
//                   isBot ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : "bg-blue-600 text-white"
//                 }`}>
//                   {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
//                 </div>
                
//                 <div className="space-y-1">
//                   <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
//                     isBot 
//                       ? "bg-[#141b2c] text-gray-200 border border-[#1f293d]" 
//                       : "bg-blue-600 text-white rounded-tr-none"
//                   }`}>
//                     {/* Render basic custom styled text with bold markers */}
//                     <p className="whitespace-pre-wrap">
//                       {m.text.split("**").map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{chunk}</strong> : chunk)}
//                     </p>
//                   </div>
//                   <span className={`text-[9px] text-gray-500 font-mono block ${isBot ? "text-left" : "text-right"}`}>
//                     {m.timestamp}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}

//           {isTyping && (
//             <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
//                 <Bot className="w-4 h-4 animate-spin" />
//               </div>
//               <div className="bg-[#141b2c] border border-[#1f293d] p-3.5 rounded-xl text-xs text-gray-400">
//                 <span className="flex items-center space-x-1">
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75" />
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150" />
//                   <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
//                 </span>
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Message Input form */}
//         <form onSubmit={handleSendChat} className="p-4 border-t border-[#151c2d] bg-[#090d16]">
//           <div className="relative">
//             <input
//               id="chat-user-input"
//               type="text"
//               placeholder="Ask about workspace health, update recommendations..."
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               className="w-full bg-[#070a12] border border-[#1e283d] text-gray-200 pl-4 pr-12 py-3 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 font-sans"
//             />
//             <button
//               id="btn-send-chat"
//               type="submit"
//               disabled={!chatInput.trim() || isTyping}
//               className="absolute right-2.5 top-2 p-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all cursor-pointer"
//             >
//               <Send className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Column 2: Magic Task Drafter (Right, 5 columns) */}
//       <div className="lg:col-span-5 space-y-5">
//         <div className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 shadow-xl">
//           <div className="flex items-center space-x-2 mb-3">
//             <Sparkles className="w-4 h-4 text-indigo-400" />
//             <h3 className="text-sm font-semibold text-white font-display">AI Task Drafter</h3>
//           </div>
//           <p className="text-xs text-gray-400 leading-relaxed mb-4">
//             Type out a loose requirement (e.g., "Add compliance guidelines to core tax document by Lena Müller due next Friday"), and Gemini will instantly build a structured board task.
//           </p>

//           <div className="space-y-3">
//             <textarea
//               id="ai-drafter-input"
//               rows={3}
//               placeholder="e.g. Audit subscription API routes. Make priority Urgent and due on July 20"
//               value={naturalLanguagePrompt}
//               onChange={(e) => setNaturalLanguagePrompt(e.target.value)}
//               className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 p-3 rounded-lg text-xs focus:outline-none focus:border-indigo-500 resize-none placeholder:text-gray-600 leading-relaxed font-sans"
//             />

//             <button
//               id="btn-trigger-ai-draft"
//               type="button"
//               onClick={handleSuggestTask}
//               disabled={isDrafting || !naturalLanguagePrompt.trim()}
//               className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-950/20 active:scale-[0.98] disabled:opacity-40 disabled:hover:from-blue-600 transition-all cursor-pointer"
//             >
//               {isDrafting ? "AI is processing draft..." : "Analyze and Draft Task"}
//             </button>
//           </div>
//         </div>

//         {/* Task Preview Block (Shown if successfully compiled) */}
//         {suggestedTask && (
//           <div id="draft-task-preview" className="bg-[#0b0f19] border border-emerald-500/30 rounded-xl p-5 shadow-xl space-y-4 animate-fade-in">
//             <div className="flex items-center justify-between border-b border-[#151c2d] pb-2.5">
//               <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
//                 DRAFT READY
//               </span>
//               <span className="text-[10px] text-gray-500 font-mono">Confirm Details</span>
//             </div>

//             <div className="space-y-3 font-sans">
//               <div>
//                 <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Task Title</span>
//                 <p className="text-xs font-semibold text-white">{suggestedTask.title}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Priority</span>
//                   <span className="text-xs font-semibold text-amber-400">{suggestedTask.priority}</span>
//                 </div>
//                 <div>
//                   <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Target Date</span>
//                   <span className="text-xs font-mono font-semibold text-gray-300">{suggestedTask.dueDate}</span>
//                 </div>
//               </div>

//               <div>
//                 <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Extracted Notes</span>
//                 <p className="text-[11px] text-gray-400 leading-relaxed bg-[#070a12] p-2.5 rounded border border-[#141b2c]">{suggestedTask.notes}</p>
//               </div>

//               {/* Choose Assignee & Campaign for injection */}
//               <div className="grid grid-cols-2 gap-3 pt-2">
//                 <div>
//                   <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1">Select Assignee</span>
//                   <select
//                     id="draft-select-assignee"
//                     value={draftAssignee}
//                     onChange={(e) => setDraftAssignee(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 px-2 py-1.5 rounded text-xs focus:outline-none"
//                   >
//                     {team.map(m => (
//                       <option key={m.id} value={m.id}>{m.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1">Target Campaign</span>
//                   <select
//                     id="draft-select-project"
//                     value={draftProject}
//                     onChange={(e) => setDraftProject(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 px-2 py-1.5 rounded text-xs focus:outline-none"
//                   >
//                     {projects.map(p => (
//                       <option key={p.id} value={p.id}>{p.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <button
//                 id="btn-post-drafted-task"
//                 type="button"
//                 onClick={handleAddDraftedTask}
//                 className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md active:scale-[0.98] transition-all cursor-pointer"
//               >
//                 Inject Task to Active Sprints
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Tip Box */}
//         <div className="bg-[#0b0f19] border border-[#151c2d] p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-gray-500">
//           <HelpCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="font-semibold text-gray-400">Drafter Tip</p>
//             <p className="mt-0.5 text-gray-500 font-sans">
//               To trigger the most accurate AI conversion, specify details like "High priority", "completed status", or dates in the "YYYY-MM-DD" format.
//             </p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }


//** corrected code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, HelpCircle } from "lucide-react";


export default function AiAssistantView({ projects, team, onAddTask }) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "init",
      sender: "assistant",
      text: "Hello! I am your **Polaris Project Assistant** powered by Gemini. Ask me about your active tasks, campaign status, workspace bottlenecks, or use the **AI Task Drafter** on the right to auto-draft real structured tasks using natural language!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Task Drafter States
  const [naturalLanguagePrompt, setNaturalLanguagePrompt] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [suggestedTask, setSuggestedTask] = useState(null);

  const [draftProject, setDraftProject] = useState(projects[0]?.id || "");
  const [draftAssignee, setDraftAssignee] = useState(team[0]?.id || "");

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: data.text || "I processed your request, but wasn't able to compile a clear reply. Let me review your dashboard metrics instead!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: "I experienced a minor connection latency while processing this prompt. Please check your network or try again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestTask = async () => {
    if (!naturalLanguagePrompt.trim()) return;
    setIsDrafting(true);
    setSuggestedTask(null);

    try {
      const response = await fetch("/api/ai/suggest-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: naturalLanguagePrompt }),
      });
      const data = await response.json();
      if (data.task) {
        setSuggestedTask(data.task);
      }
    } catch (err) {
      console.error("Task suggest error:", err);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleAddDraftedTask = () => {
    if (!suggestedTask) return;
    
    onAddTask({
      title: suggestedTask.title,
      status: suggestedTask.status,
      priority: suggestedTask.priority,
      dueDate: suggestedTask.dueDate,
      assigneeId: draftAssignee,
      projectId: draftProject,
      notes: suggestedTask.notes,
    });

    // Notify user in chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "assistant",
        text: `🚀 **Success!** I have formulated and appended your drafted task: **"${suggestedTask.title}"** to your team's Tasks board!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    setSuggestedTask(null);
    setNaturalLanguagePrompt("");
  };

  return (
    <div id="ai-assistant-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto py-2">
      
      {/* Column 1: Chat interface (Left, 7 columns) */}
      <div className="lg:col-span-7 bg-[#0b0f19] border border-[#151c2d] rounded-xl flex flex-col h-[calc(100vh-140px)] shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#151c2d] flex items-center justify-between bg-gradient-to-r from-blue-950/20 to-purple-950/20">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-display">Polaris Copilot Coach</h3>
              <p className="text-[10px] text-gray-500 font-mono">Powered by Gemini 3.5 Flash</p>
            </div>
          </div>
          <span className="bg-[#121c32] text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-500/20">
            Realtime AI
          </span>
        </div>

        {/* Message feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
          {messages.map((m) => {
            const isBot = m.sender === "assistant";
            return (
              <div
                key={m.id}
                id={`chat-msg-${m.id}`}
                className={`flex items-start space-x-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse space-x-reverse"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                  isBot ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : "bg-blue-600 text-white"
                }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    isBot 
                      ? "bg-[#141b2c] text-gray-200 border border-[#1f293d]" 
                      : "bg-blue-600 text-white rounded-tr-none"
                  }`}>
                    {/* Render basic custom styled text with bold markers */}
                    <p className="whitespace-pre-wrap">
                      {m.text.split("**").map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{chunk}</strong> : chunk)}
                    </p>
                  </div>
                  <span className={`text-[9px] text-gray-500 font-mono block ${isBot ? "text-left" : "text-right"}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#141b2c] border border-[#1f293d] p-3.5 rounded-xl text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input form */}
        <form onSubmit={handleSendChat} className="p-4 border-t border-[#151c2d] bg-[#090d16]">
          <div className="relative">
            <input
              id="chat-user-input"
              type="text"
              placeholder="Ask about workspace health, update recommendations..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="w-full bg-[#070a12] border border-[#1e283d] text-gray-200 pl-4 pr-12 py-3 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600 font-sans"
            />
            <button
              id="btn-send-chat"
              type="submit"
              disabled={!chatInput.trim() || isTyping}
              className="absolute right-2.5 top-2 p-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Column 2: Magic Task Drafter (Right, 5 columns) */}
      <div className="lg:col-span-5 space-y-5">
        <div className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white font-display">AI Task Drafter</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Type out a loose requirement (e.g., "Add compliance guidelines to core tax document by Lena Müller due next Friday"), and Gemini will instantly build a structured board task.
          </p>

          <div className="space-y-3">
            <textarea
              id="ai-drafter-input"
              rows={3}
              placeholder="e.g. Audit subscription API routes. Make priority Urgent and due on July 20"
              value={naturalLanguagePrompt}
              onChange={(e) => setNaturalLanguagePrompt(e.target.value)}
              className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 p-3 rounded-lg text-xs focus:outline-none focus:border-indigo-500 resize-none placeholder:text-gray-600 leading-relaxed font-sans"
            />

            <button
              id="btn-trigger-ai-draft"
              type="button"
              onClick={handleSuggestTask}
              disabled={isDrafting || !naturalLanguagePrompt.trim()}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-950/20 active:scale-[0.98] disabled:opacity-40 disabled:hover:from-blue-600 transition-all cursor-pointer"
            >
              {isDrafting ? "AI is processing draft..." : "Analyze and Draft Task"}
            </button>
          </div>
        </div>

        {/* Task Preview Block (Shown if successfully compiled) */}
        {suggestedTask && (
          <div id="draft-task-preview" className="bg-[#0b0f19] border border-emerald-500/30 rounded-xl p-5 shadow-xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#151c2d] pb-2.5">
              <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                DRAFT READY
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Confirm Details</span>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Task Title</span>
                <p className="text-xs font-semibold text-white">{suggestedTask.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Priority</span>
                  <span className="text-xs font-semibold text-amber-400">{suggestedTask.priority}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Target Date</span>
                  <span className="text-xs font-mono font-semibold text-gray-300">{suggestedTask.dueDate}</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-0.5">Extracted Notes</span>
                <p className="text-[11px] text-gray-400 leading-relaxed bg-[#070a12] p-2.5 rounded border border-[#141b2c]">{suggestedTask.notes}</p>
              </div>

              {/* Choose Assignee & Campaign for injection */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1">Select Assignee</span>
                  <select
                    id="draft-select-assignee"
                    value={draftAssignee}
                    onChange={(e) => setDraftAssignee(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 px-2 py-1.5 rounded text-xs focus:outline-none"
                  >
                    {team.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-500 block mb-1">Target Campaign</span>
                  <select
                    id="draft-select-project"
                    value={draftProject}
                    onChange={(e) => setDraftProject(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1c263c] text-gray-200 px-2 py-1.5 rounded text-xs focus:outline-none"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                id="btn-post-drafted-task"
                type="button"
                onClick={handleAddDraftedTask}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                Inject Task to Active Sprints
              </button>
            </div>
          </div>
        )}

        {/* Tip Box */}
        <div className="bg-[#0b0f19] border border-[#151c2d] p-4 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-gray-500">
          <HelpCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-400">Drafter Tip</p>
            <p className="mt-0.5 text-gray-500 font-sans">
              To trigger the most accurate AI conversion, specify details like "High priority", "completed status", or dates in the "YYYY-MM-DD" format.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

