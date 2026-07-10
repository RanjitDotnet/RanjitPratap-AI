// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { useState } from "react";
// import { ActivityEvent } from "../types";
// import { Search, Filter, Plus, RotateCcw, Sparkles } from "lucide-react";

// interface ActivityLogViewProps {
//   events: ActivityEvent[];
//   onAddSimulatedEvent: () => void;
//   onClearEvents: () => void;
// }

// export default function ActivityLogView({ 
//   events, 
//   onAddSimulatedEvent,
//   onClearEvents
// }: ActivityLogViewProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState<"All" | "Task" | "Project" | "Team">("All");
//   const [activeStatusFilter, setActiveStatusFilter] = useState<string>("All");

//   // Filtering logic
//   const filteredEvents = events.filter((ev) => {
//     const matchesSearch = 
//       ev.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ev.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ev.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (ev.assigneeName && ev.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()));

//     const matchesType = activeFilter === "All" || ev.targetType === activeFilter;
//     const matchesStatus = activeStatusFilter === "All" || ev.statusLabel === activeStatusFilter;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   return (
//     <div id="activity-log-view" className="space-y-6 max-w-5xl mx-auto py-2">
//       {/* View Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Activity log</h2>
//           <p className="text-sm text-gray-400 mt-1">Everything happening across projects and tasks.</p>
//         </div>
//         <div className="flex items-center space-x-2 self-start md:self-auto">
//           <button
//             id="btn-simulate-event"
//             onClick={onAddSimulatedEvent}
//             className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md shadow-indigo-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
//           >
//             <Plus className="w-3.5 h-3.5" />
//             <span>Simulate Event</span>
//           </button>
//           <button
//             id="btn-reset-events"
//             onClick={onClearEvents}
//             title="Reset to default feed"
//             className="flex items-center justify-center bg-[#151c2d] hover:bg-[#1a233a] text-gray-400 hover:text-white p-2.5 rounded-lg text-xs border border-[#1f2a44] transition-all duration-100 cursor-pointer"
//           >
//             <RotateCcw className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Control Bar: Search and Filters */}
//       <div id="activity-controls" className="bg-[#0b0f19] p-4 rounded-xl border border-[#151c2d] flex flex-col md:flex-row gap-4 items-center justify-between">
//         {/* Search */}
//         <div className="relative w-full md:w-80">
//           <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
//           <input
//             id="activity-search-input"
//             type="text"
//             placeholder="Search activity history..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-[#070a12] border border-[#1a233a] text-gray-200 pl-9 pr-4 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
//           <div className="flex items-center space-x-1 bg-[#070a12] p-1 rounded-lg border border-[#141c2f]">
//             {(["All", "Task", "Project"] as const).map((type) => (
//               <button
//                 key={type}
//                 id={`filter-type-${type}`}
//                 onClick={() => setActiveFilter(type)}
//                 className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
//                   activeFilter === type 
//                     ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
//                     : "text-gray-500 hover:text-gray-300 border border-transparent"
//                 }`}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center space-x-1 bg-[#070a12] p-1 rounded-lg border border-[#141c2f]">
//             {["All", "Created", "Updated", "Assigned", "Completed"].map((status) => (
//               <button
//                 key={status}
//                 id={`filter-status-${status}`}
//                 onClick={() => setActiveStatusFilter(status)}
//                 className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
//                   activeStatusFilter === status 
//                     ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" 
//                     : "text-gray-500 hover:text-gray-300 border border-transparent"
//                 }`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Card Container exactly mimicking the screenshot */}
//       <div id="activity-log-card" className="bg-[#0b0f19] rounded-xl border border-[#141d31] overflow-hidden shadow-xl">
//         {filteredEvents.length === 0 ? (
//           <div id="empty-activities" className="py-16 text-center">
//             <Filter className="w-10 h-10 text-gray-700 mx-auto mb-3" />
//             <p className="text-gray-400 text-sm font-medium">No activity matches your filters.</p>
//             <p className="text-xs text-gray-600 mt-1">Try clearing some query filters or add a simulated event!</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-[#151d30]">
//             {filteredEvents.map((ev, idx) => (
//               <div
//                 key={ev.id}
//                 id={`activity-row-${ev.id}`}
//                 className="p-5 flex items-start space-x-4 hover:bg-[#0c1325]/50 transition-colors duration-150 animate-[fadeIn_0.2s_ease-out]"
//               >
//                 {/* User Avatar Circle */}
//                 <div className={`w-9 h-9 rounded-full ${ev.userColor} flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md ring-1 ring-[#151d30]`}>
//                   {ev.userInitials}
//                 </div>

//                 {/* Details Block */}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-300 leading-normal">
//                     <span className="font-semibold text-white mr-1 hover:underline cursor-pointer">{ev.userName}</span>
//                     <span className="text-gray-400 mr-1">{ev.action}</span>
//                     <span className="font-medium text-white hover:text-blue-400 transition-colors cursor-pointer">
//                       “{ev.targetName}”
//                     </span>
//                     {ev.assigneeName && (
//                       <>
//                         <span className="text-gray-400 mx-1">to</span>
//                         <span className="font-semibold text-white hover:underline cursor-pointer">{ev.assigneeName}</span>
//                       </>
//                     )}
//                   </p>
                  
//                   {/* Meta Info Row */}
//                   <div className="flex items-center space-x-2 mt-1.5 text-xs text-gray-500 font-mono">
//                     <span>{ev.timestamp}</span>
//                     <span>•</span>
//                     <span>{ev.statusLabel}</span>
//                     <span>•</span>
//                     <span>{ev.targetType}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* AI Advice Banner */}
//       <div className="bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-indigo-950/20 border border-purple-900/30 rounded-xl p-4 flex items-center space-x-3 shadow-md">
//         <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 animate-pulse" />
//         <div className="leading-relaxed">
//           <p className="text-xs font-semibold text-purple-300 font-display">AI Insight Coach</p>
//           <p className="text-[11px] text-gray-400 mt-0.5">
//             Sprint velocity is looking optimal. You have logged {events.length} system events. Aisha and Daniel are leading active operations across compliance webhooks and client rewrites. Connect with the AI Assistant tab to draft new tasks from raw prompt drafts!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// Corrected code


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Filter, Plus, RotateCcw, Sparkles } from "lucide-react";

export default function ActivityLogView({ 
  events, 
  onAddSimulatedEvent,
  onClearEvents
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");

  // Filtering logic
  const filteredEvents = events.filter((ev) => {
    const matchesSearch = 
      ev.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.assigneeName && ev.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = activeFilter === "All" || ev.targetType === activeFilter;
    const matchesStatus = activeStatusFilter === "All" || ev.statusLabel === activeStatusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div id="activity-log-view" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Activity log</h2>
          <p className="text-sm text-gray-400 mt-1">Everything happening across projects and tasks.</p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            id="btn-simulate-event"
            onClick={onAddSimulatedEvent}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md shadow-indigo-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Event</span>
          </button>
          <button
            id="btn-reset-events"
            onClick={onClearEvents}
            title="Reset to default feed"
            className="flex items-center justify-center bg-[#151c2d] hover:bg-[#1a233a] text-gray-400 hover:text-white p-2.5 rounded-lg text-xs border border-[#1f2a44] transition-all duration-100 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Bar: Search and Filters */}
      <div id="activity-controls" className="bg-[#0b0f19] p-4 rounded-xl border border-[#151c2d] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            id="activity-search-input"
            type="text"
            placeholder="Search activity history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070a12] border border-[#1a233a] text-gray-200 pl-9 pr-4 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-1 bg-[#070a12] p-1 rounded-lg border border-[#141c2f]">
            {["All", "Task", "Project"].map((type) => (
              <button
                key={type}
                id={`filter-type-${type}`}
                onClick={() => setActiveFilter(type)}
                className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                  activeFilter === type 
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 bg-[#070a12] p-1 rounded-lg border border-[#141c2f]">
            {["All", "Created", "Updated", "Assigned", "Completed"].map((status) => (
              <button
                key={status}
                id={`filter-status-${status}`}
                onClick={() => setActiveStatusFilter(status)}
                className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                  activeStatusFilter === status 
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" 
                    : "text-gray-500 hover:text-gray-300 border border-transparent"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Card Container exactly mimicking the screenshot */}
      <div id="activity-log-card" className="bg-[#0b0f19] rounded-xl border border-[#141d31] overflow-hidden shadow-xl">
        {filteredEvents.length === 0 ? (
          <div id="empty-activities" className="py-16 text-center">
            <Filter className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">No activity matches your filters.</p>
            <p className="text-xs text-gray-600 mt-1">Try clearing some query filters or add a simulated event!</p>
          </div>
        ) : (
          <div className="divide-y divide-[#151d30]">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                id={`activity-row-${ev.id}`}
                className="p-5 flex items-start space-x-4 hover:bg-[#0c1325]/50 transition-colors duration-150 animate-[fadeIn_0.2s_ease-out]"
              >
                {/* User Avatar Circle */}
                <div className={`w-9 h-9 rounded-full ${ev.userColor} flex-shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md ring-1 ring-[#151d30]`}>
                  {ev.userInitials}
                </div>

                {/* Details Block */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 leading-normal">
                    <span className="font-semibold text-white mr-1 hover:underline cursor-pointer">{ev.userName}</span>
                    <span className="text-gray-400 mr-1">{ev.action}</span>
                    <span className="font-medium text-white hover:text-blue-400 transition-colors cursor-pointer">
                      “{ev.targetName}”
                    </span>
                    {ev.assigneeName && (
                      <>
                        <span className="text-gray-400 mx-1">to</span>
                        <span className="font-semibold text-white hover:underline cursor-pointer">{ev.assigneeName}</span>
                      </>
                    )}
                  </p>
                  
                  {/* Meta Info Row */}
                  <div className="flex items-center space-x-2 mt-1.5 text-xs text-gray-500 font-mono">
                    <span>{ev.timestamp}</span>
                    <span>•</span>
                    <span>{ev.statusLabel}</span>
                    <span>•</span>
                    <span>{ev.targetType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Advice Banner */}
      <div className="bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-indigo-950/20 border border-purple-900/30 rounded-xl p-4 flex items-center space-x-3 shadow-md">
        <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 animate-pulse" />
        <div className="leading-relaxed">
          <p className="text-xs font-semibold text-purple-300 font-display">AI Insight Coach</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Sprint velocity is looking optimal. You have logged {events.length} system events. Aisha and Daniel are leading active operations across compliance webhooks and client rewrites. Connect with the AI Assistant tab to draft new tasks from raw prompt drafts!
          </p>
        </div>
      </div>
    </div>
  );
}

