// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { useState } from "react";
// import { Terminal, Settings, RefreshCw, Database, Server, Key, HelpCircle } from "lucide-react";

// interface AdminConsoleViewProps {
//   onResetToImageState: () => void;
//   onClearAllData: () => void;
// }

// export default function AdminConsoleView({ onResetToImageState, onClearAllData }: AdminConsoleViewProps) {
//   const [dbStatus, setDbStatus] = useState<"Online" | "Offline" | "Syncing">("Online");
//   const [syncLogs, setSyncLogs] = useState<string[]>([
//     "[SYSTEM] Initiated Polaris Workspace connection.",
//     "[DB] Loaded 7 core activity logs matching user visual reference.",
//     "[NET] .NET Core 8.0 controller proxy active on /api/*.",
//     "[SQL] Selected schema [PolarisDb].[dbo].[Sprints] initialized.",
//   ]);

//   const handleTriggerSync = () => {
//     setDbStatus("Syncing");
//     setSyncLogs((prev) => [...prev, `[NET] POST /api/sync initiated at ${new Date().toLocaleTimeString()}`]);
    
//     setTimeout(() => {
//       setDbStatus("Online");
//       setSyncLogs((prev) => [
//         ...prev,
//         `[DB] SQL Server bulk update successful. Sync status: OK.`,
//         `[SYSTEM] Refreshed local in-memory indices.`
//       ]);
//     }, 1200);
//   };

//   return (
//     <div id="admin-console-view" className="space-y-6 max-w-5xl mx-auto py-2">
//       {/* Header */}
//       <div>
//         <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Admin console</h2>
//         <p className="text-sm text-gray-400 mt-1">Simulate database actions, inspect .NET backend sync state, and trigger telemetry resets.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left Column: DB State & Reset actions (7 columns) */}
//         <div className="lg:col-span-7 space-y-6">
//           {/* Card 1: Server and DB Simulation */}
//           <div className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 shadow-xl space-y-5">
//             <div className="flex items-center space-x-2.5">
//               <Database className="w-5 h-5 text-blue-400" />
//               <h3 className="text-sm font-semibold text-white font-display">SQL Server & .NET Backend Status</h3>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-[#080d14]/60 p-4 rounded-lg border border-[#141b2c] leading-relaxed">
//                 <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold">SQL DATABASE</span>
//                 <span className="text-sm font-semibold text-white mt-1 block">POLARIS-PROD-SQL</span>
//                 <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Sprints, Activities, Members</span>
//               </div>

//               <div className="bg-[#080d14]/60 p-4 rounded-lg border border-[#141b2c] leading-relaxed">
//                 <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold">CONNECTION</span>
//                 <span className="flex items-center space-x-1.5 mt-1">
//                   <span className={`w-2 h-2 rounded-full ${
//                     dbStatus === "Online" ? "bg-emerald-500 animate-pulse" :
//                     dbStatus === "Syncing" ? "bg-amber-500 animate-spin" : "bg-red-500"
//                   }`} />
//                   <span className="text-sm font-semibold text-white font-mono">{dbStatus}</span>
//                 </span>
//                 <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Ping: 12ms (via API Gateway)</span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 pt-2">
//               <button
//                 id="btn-trigger-backend-sync"
//                 onClick={handleTriggerSync}
//                 className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
//               >
//                 <RefreshCw className="w-3.5 h-3.5" />
//                 <span>Trigger Bulk Sync</span>
//               </button>

//               <button
//                 id="btn-admin-reset-image-state"
//                 onClick={onResetToImageState}
//                 className="flex items-center space-x-2 bg-[#151c2d] hover:bg-[#1f2a44] text-gray-200 px-4 py-2 rounded-lg text-xs font-semibold border border-[#1f2a44] cursor-pointer transition-all"
//               >
//                 <span>Reset to Screenshot State</span>
//               </button>
//             </div>
//           </div>

//           {/* Card 2: Destructive actions */}
//           <div className="bg-[#0b0f19] border border-red-950/40 rounded-xl p-5 shadow-xl space-y-4">
//             <div>
//               <h3 className="text-sm font-semibold text-red-400 font-display">Destructive Operations</h3>
//               <p className="text-xs text-gray-500 mt-1">Clear active workspace state. Perfect for testing blank-slate views or starting a clean sprint planning sequence.</p>
//             </div>

//             <button
//               id="btn-admin-clear-all"
//               onClick={onClearAllData}
//               className="py-2 px-4 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 rounded-lg text-xs font-semibold cursor-pointer transition-all"
//             >
//               Flush All Board Tasks & Activities
//             </button>
//           </div>
//         </div>

//         {/* Right Column: Server console logs (5 columns) */}
//         <div className="lg:col-span-5 flex flex-col">
//           <div className="bg-[#070a13] border border-[#141d31] rounded-xl flex-1 flex flex-col overflow-hidden min-h-[300px]">
//             {/* Terminal Header */}
//             <div className="bg-[#0d1322] px-4 py-2 border-b border-[#141d31] flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Terminal className="w-3.5 h-3.5 text-blue-400" />
//                 <span className="text-[10px] font-bold font-mono text-gray-400">GATEWAY STREAM LOGS</span>
//               </div>
//               <div className="flex space-x-1">
//                 <span className="w-2 h-2 rounded-full bg-red-500" />
//                 <span className="w-2 h-2 rounded-full bg-amber-500" />
//                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
//               </div>
//             </div>

//             {/* Terminal Content */}
//             <div className="flex-1 p-4 font-mono text-[11px] text-emerald-400 space-y-2 overflow-y-auto leading-relaxed">
//               {syncLogs.map((log, i) => (
//                 <div key={i} className="whitespace-pre-wrap">
//                   {log}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//**  Corrected Code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Terminal, Database, RefreshCw } from "lucide-react";

export default function AdminConsoleView({ onResetToImageState, onClearAllData }) {
  const [dbStatus, setDbStatus] = useState("Online");
  const [syncLogs, setSyncLogs] = useState([
    "[SYSTEM] Initiated Polaris Workspace connection.",
    "[DB] Loaded 7 core activity logs matching user visual reference.",
    "[NET] .NET Core 8.0 controller proxy active on /api/*.",
    "[SQL] Selected schema [PolarisDb].[dbo].[Sprints] initialized.",
  ]);

  const handleTriggerSync = () => {
    setDbStatus("Syncing");
    setSyncLogs((prev) => [...prev, `[NET] POST /api/sync initiated at ${new Date().toLocaleTimeString()}`]);
    
    setTimeout(() => {
      setDbStatus("Online");
      setSyncLogs((prev) => [
        ...prev,
        `[DB] SQL Server bulk update successful. Sync status: OK.`,
        `[SYSTEM] Refreshed local in-memory indices.`
      ]);
    }, 1200);
  };

  return (
    <div id="admin-console-view" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Admin console</h2>
        <p className="text-sm text-gray-400 mt-1">Simulate database actions, inspect .NET backend sync state, and trigger telemetry resets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: DB State & Reset actions (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Server and DB Simulation */}
          <div className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 shadow-xl space-y-5">
            <div className="flex items-center space-x-2.5">
              <Database className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-white font-display">SQL Server & .NET Backend Status</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#080d14]/60 p-4 rounded-lg border border-[#141b2c] leading-relaxed">
                <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold">SQL DATABASE</span>
                <span className="text-sm font-semibold text-white mt-1 block">POLARIS-PROD-SQL</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Sprints, Activities, Members</span>
              </div>

              <div className="bg-[#080d14]/60 p-4 rounded-lg border border-[#141b2c] leading-relaxed">
                <span className="text-[10px] text-gray-500 font-mono block uppercase font-bold">CONNECTION</span>
                <span className="flex items-center space-x-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${
                    dbStatus === "Online" ? "bg-emerald-500 animate-pulse" :
                    dbStatus === "Syncing" ? "bg-amber-500 animate-spin" : "bg-red-500"
                  }`} />
                  <span className="text-sm font-semibold text-white font-mono">{dbStatus}</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Ping: 12ms (via API Gateway)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                id="btn-trigger-backend-sync"
                onClick={handleTriggerSync}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Trigger Bulk Sync</span>
              </button>

              <button
                id="btn-admin-reset-image-state"
                onClick={onResetToImageState}
                className="flex items-center space-x-2 bg-[#151c2d] hover:bg-[#1f2a44] text-gray-200 px-4 py-2 rounded-lg text-xs font-semibold border border-[#1f2a44] cursor-pointer transition-all"
              >
                <span>Reset to Screenshot State</span>
              </button>
            </div>
          </div>

          {/* Card 2: Destructive actions */}
          <div className="bg-[#0b0f19] border border-red-950/40 rounded-xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-red-400 font-display">Destructive Operations</h3>
              <p className="text-xs text-gray-500 mt-1">Clear active workspace state. Perfect for testing blank-slate views or starting a clean sprint planning sequence.</p>
            </div>

            <button
              id="btn-admin-clear-all"
              onClick={onClearAllData}
              className="py-2 px-4 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 rounded-lg text-xs font-semibold cursor-pointer transition-all"
            >
              Flush All Board Tasks & Activities
            </button>
          </div>
        </div>

        {/* Right Column: Server console logs (5 columns) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#070a13] border border-[#141d31] rounded-xl flex-1 flex flex-col overflow-hidden min-h-[300px]">
            {/* Terminal Header */}
            <div className="bg-[#0d1322] px-4 py-2 border-b border-[#141d31] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-bold font-mono text-gray-400">GATEWAY STREAM LOGS</span>
              </div>
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-4 font-mono text-[11px] text-emerald-400 space-y-2 overflow-y-auto leading-relaxed">
              {syncLogs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

