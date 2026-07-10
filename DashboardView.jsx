// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { Task, Project, TeamMember } from "../types";
// import { 
//   Briefcase, 
//   CheckSquare, 
//   Clock, 
//   TrendingUp, 
//   Sparkles, 
//   CheckCircle2, 
//   AlertTriangle 
// } from "lucide-react";
// import { 
//   ResponsiveContainer, 
//   AreaChart, 
//   Area, 
//   XAxis, 
//   YAxis, 
//   Tooltip, 
//   BarChart, 
//   Bar, 
//   Cell 
// } from "recharts";

// interface DashboardViewProps {
//   tasks: Task[];
//   projects: Project[];
//   team: TeamMember[];
// }

// export default function DashboardView({ tasks, projects, team }: DashboardViewProps) {
//   // Compute Stats
//   const totalTasks = tasks.length;
//   const completedTasks = tasks.filter((t) => t.status === "Completed").length;
//   const activeTasks = totalTasks - completedTasks;
//   const urgentTasks = tasks.filter((t) => t.priority === "Urgent" || t.priority === "High").length;
  
//   const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
//   const activeProjectsCount = projects.filter((p) => p.status === "Active").length;

//   // Chart Data: Task Count by Project
//   const taskDistributionData = projects.map((proj) => {
//     const projTasks = tasks.filter((t) => t.projectId === proj.id);
//     return {
//       name: proj.name.length > 15 ? proj.name.substring(0, 15) + "..." : proj.name,
//       total: projTasks.length,
//       completed: projTasks.filter((t) => t.status === "Completed").length,
//     };
//   });

//   // Chart Data: Sprint burndown / workload history
//   const burndownData = [
//     { day: "Day 1", remaining: 15, completed: 0 },
//     { day: "Day 2", remaining: 14, completed: 1 },
//     { day: "Day 3", remaining: 12, completed: 3 },
//     { day: "Day 4", remaining: 10, completed: 5 },
//     { day: "Day 5", remaining: 9, completed: 6 },
//     { day: "Day 6", remaining: 6, completed: 9 },
//     { day: "Day 7", remaining: 4, completed: 11 },
//   ];

//   // Workload count per team member
//   const memberWorkload = team.map((member) => {
//     const activeMemberTasks = tasks.filter(
//       (t) => t.assigneeId === member.id && t.status !== "Completed"
//     ).length;
//     return {
//       name: member.name,
//       tasks: activeMemberTasks,
//       color: member.color,
//     };
//   });

//   return (
//     <div id="dashboard-view" className="space-y-6 max-w-5xl mx-auto py-2">
//       {/* Welcome Banner */}
//       <div id="dashboard-welcome-banner" className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#0c1221] p-6 rounded-2xl border border-blue-900/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-blue-950/5">
//         <div>
//           <h2 className="text-2xl font-bold text-white font-display tracking-tight flex items-center gap-2">
//             Welcome Back, Aisha <span className="animate-bounce">👋</span>
//           </h2>
//           <p className="text-sm text-gray-400 mt-1">Here is a quick overview of what is happening across your Polaris workspace today.</p>
//         </div>
//         <div className="flex items-center space-x-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2.5 rounded-xl">
//           <Sparkles className="w-5 h-5 text-blue-400" />
//           <div className="leading-none">
//             <span className="text-[10px] text-gray-500 font-mono block font-semibold">WORKSPACE HEALTH</span>
//             <span className="text-xs text-blue-300 font-semibold mt-0.5 inline-block">All systems operational</span>
//           </div>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div id="metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Metric 1 */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Active Tasks</span>
//             <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
//               <Clock className="w-4 h-4" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{activeTasks}</h3>
//             <p className="text-[10px] text-gray-500 mt-1">Pending action and review</p>
//           </div>
//         </div>

//         {/* Metric 2 */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Completion Rate</span>
//             <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
//               <CheckCircle2 className="w-4 h-4" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{completionRate}%</h3>
//             <p className="text-[10px] text-emerald-500 mt-1 font-semibold">+{completedTasks} tasks finalized</p>
//           </div>
//         </div>

//         {/* Metric 3 */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Active Projects</span>
//             <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
//               <Briefcase className="w-4 h-4" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{activeProjectsCount}</h3>
//             <p className="text-[10px] text-gray-500 mt-1">Across workspace squads</p>
//           </div>
//         </div>

//         {/* Metric 4 */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Attention Required</span>
//             <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
//               <AlertTriangle className="w-4 h-4" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{urgentTasks}</h3>
//             <p className="text-[10px] text-red-400 mt-1 font-semibold">High & Urgent priority</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Area Chart: Burnup / Remaining Tasks */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
//           <div>
//             <h4 className="text-sm font-semibold text-white font-display tracking-tight flex items-center gap-2">
//               <TrendingUp className="w-4 h-4 text-blue-400" />
//               Sprint Progress (Day-by-Day)
//             </h4>
//             <p className="text-xs text-gray-500 mt-1">Remaining vs completed tasks throughout the active sprint.</p>
//           </div>
          
//           <div className="h-64 mt-6">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={burndownData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
//                     <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
//                   </linearGradient>
//                   <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="day" stroke="#4b5563" fontSize={10} tickLine={false} />
//                 <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1f2a44', borderRadius: '8px' }}
//                   labelStyle={{ color: '#ffffff', fontSize: '11px', fontFamily: 'monospace' }}
//                   itemStyle={{ fontSize: '11px', padding: '2px 0' }}
//                 />
//                 <Area type="monotone" dataKey="remaining" stroke="#ef4444" fillOpacity={1} fill="url(#colorRemaining)" name="Remaining Tasks" />
//                 <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" name="Completed Tasks" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart: Projects Distribution */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
//           <div>
//             <h4 className="text-sm font-semibold text-white font-display tracking-tight flex items-center gap-2">
//               <Briefcase className="w-4 h-4 text-purple-400" />
//               Task Density by Project
//             </h4>
//             <p className="text-xs text-gray-500 mt-1">Comparing the number of loaded tasks and their resolution state.</p>
//           </div>

//           <div className="h-64 mt-6">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={taskDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
//                 <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
//                 <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
//                 <Tooltip 
//                   contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1f2a44', borderRadius: '8px' }}
//                   labelStyle={{ color: '#ffffff', fontSize: '11px', fontFamily: 'monospace' }}
//                   itemStyle={{ fontSize: '11px', padding: '2px 0' }}
//                 />
//                 <Bar dataKey="total" fill="#3b82f6" name="Total Tasks" radius={[4, 4, 0, 0]}>
//                   {taskDistributionData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#2563eb" : "#4f46e5"} />
//                   ))}
//                 </Bar>
//                 <Bar dataKey="completed" fill="#10b981" name="Completed Tasks" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Workload list & Mini Project Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Team Workload Sheet */}
//         <div className="md:col-span-2 bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md">
//           <h4 className="text-sm font-semibold text-white font-display tracking-tight">Active Workload Distribution</h4>
//           <p className="text-xs text-gray-500 mt-1">Number of current tasks assigned to team members (excluding completed ones).</p>
          
//           <div className="space-y-4 mt-5">
//             {memberWorkload.map((mw) => (
//               <div key={mw.name} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3 w-1/3">
//                   <span className="text-xs font-medium text-gray-200">{mw.name}</span>
//                 </div>
//                 <div className="flex-1 mx-4">
//                   <div className="w-full bg-[#151c2d] rounded-full h-2 overflow-hidden">
//                     <div 
//                       className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
//                       style={{ width: `${mw.tasks > 0 ? Math.min((mw.tasks / 5) * 100, 100) : 0}%` }}
//                     />
//                   </div>
//                 </div>
//                 <div className="w-10 text-right">
//                   <span className="text-xs font-semibold text-white font-mono">{mw.tasks} active</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Project Health Quick Card */}
//         <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
//           <div>
//             <h4 className="text-sm font-semibold text-white font-display tracking-tight">Project Spotlight</h4>
//             <p className="text-xs text-gray-500 mt-1">Core Campaign Status</p>
//           </div>

//           <div className="mt-4 p-4 rounded-xl bg-[#090d16] border border-[#141b2c] space-y-4">
//             <div>
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-semibold text-white">Q3 Launch Campaign</span>
//                 <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">ACTIVE</span>
//               </div>
//               <p className="text-[11px] text-gray-500 mt-1">Target date: August 1, 2026</p>
//             </div>

//             <div className="space-y-1">
//               <div className="flex justify-between text-[11px] text-gray-400">
//                 <span>Milestone completeness</span>
//                 <span className="font-semibold text-white">75%</span>
//               </div>
//               <div className="w-full bg-[#151c2d] h-1.5 rounded-full overflow-hidden">
//                 <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "75%" }} />
//               </div>
//             </div>
//           </div>

//           <div className="text-[10px] text-gray-600 font-mono text-center mt-3">
//             Realtime DB Connected
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// **  Corrected code


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Briefcase, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from "recharts";

export default function DashboardView({ tasks, projects, team }) {
  // Compute Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const activeTasks = totalTasks - completedTasks;
  const urgentTasks = tasks.filter((t) => t.priority === "Urgent" || t.priority === "High").length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeProjectsCount = projects.filter((p) => p.status === "Active").length;

  // Chart Data: Task Count by Project
  const taskDistributionData = projects.map((proj) => {
    const projTasks = tasks.filter((t) => t.projectId === proj.id);
    return {
      name: proj.name.length > 15 ? proj.name.substring(0, 15) + "..." : proj.name,
      total: projTasks.length,
      completed: projTasks.filter((t) => t.status === "Completed").length,
    };
  });

  // Chart Data: Sprint burndown / workload history
  const burndownData = [
    { day: "Day 1", remaining: 15, completed: 0 },
    { day: "Day 2", remaining: 14, completed: 1 },
    { day: "Day 3", remaining: 12, completed: 3 },
    { day: "Day 4", remaining: 10, completed: 5 },
    { day: "Day 5", remaining: 9, completed: 6 },
    { day: "Day 6", remaining: 6, completed: 9 },
    { day: "Day 7", remaining: 4, completed: 11 },
  ];

  // Workload count per team member
  const memberWorkload = team.map((member) => {
    const activeMemberTasks = tasks.filter(
      (t) => t.assigneeId === member.id && t.status !== "Completed"
    ).length;
    return {
      name: member.name,
      tasks: activeMemberTasks,
      color: member.color,
    };
  });

  return (
    <div id="dashboard-view" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Welcome Banner */}
      <div id="dashboard-welcome-banner" className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#0c1221] p-6 rounded-2xl border border-blue-900/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-blue-950/5">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight flex items-center gap-2">
            Welcome Back, Aisha <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">Here is a quick overview of what is happening across your Polaris workspace today.</p>
        </div>
        <div className="flex items-center space-x-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2.5 rounded-xl">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <div className="leading-none">
            <span className="text-[10px] text-gray-500 font-mono block font-semibold">WORKSPACE HEALTH</span>
            <span className="text-xs text-blue-300 font-semibold mt-0.5 inline-block">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div id="metrics-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Active Tasks</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{activeTasks}</h3>
            <p className="text-[10px] text-gray-500 mt-1">Pending action and review</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Completion Rate</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{completionRate}%</h3>
            <p className="text-[10px] text-emerald-500 mt-1 font-semibold">+{completedTasks} tasks finalized</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Active Projects</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{activeProjectsCount}</h3>
            <p className="text-[10px] text-gray-500 mt-1">Across workspace squads</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md hover:border-blue-500/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-medium uppercase font-mono tracking-wider">Attention Required</span>
            <div className="p-2 bg-red-500/10 text-red-400 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-white tracking-tight font-display">{urgentTasks}</h3>
            <p className="text-[10px] text-red-400 mt-1 font-semibold">High & Urgent priority</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div id="charts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart: Burnup / Remaining Tasks */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white font-display tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Sprint Progress (Day-by-Day)
            </h4>
            <p className="text-xs text-gray-500 mt-1">Remaining vs completed tasks throughout the active sprint.</p>
          </div>
          
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={burndownData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRemaining" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1f2a44', borderRadius: '8px' }}
                  labelStyle={{ color: '#ffffff', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ fontSize: '11px', padding: '2px 0' }}
                />
                <Area type="monotone" dataKey="remaining" stroke="#ef4444" fillOpacity={1} fill="url(#colorRemaining)" name="Remaining Tasks" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" name="Completed Tasks" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Projects Distribution */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white font-display tracking-tight flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              Task Density by Project
            </h4>
            <p className="text-xs text-gray-500 mt-1">Comparing the number of loaded tasks and their resolution state.</p>
          </div>

          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1f2a44', borderRadius: '8px' }}
                  labelStyle={{ color: '#ffffff', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ fontSize: '11px', padding: '2px 0' }}
                />
                <Bar dataKey="total" fill="#3b82f6" name="Total Tasks" radius={[4, 4, 0, 0]}>
                  {taskDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#2563eb" : "#4f46e5"} />
                  ))}
                </Bar>
                <Bar dataKey="completed" fill="#10b981" name="Completed Tasks" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Workload list & Mini Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Workload Sheet */}
        <div className="md:col-span-2 bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md">
          <h4 className="text-sm font-semibold text-white font-display tracking-tight">Active Workload Distribution</h4>
          <p className="text-xs text-gray-500 mt-1">Number of current tasks assigned to team members (excluding completed ones).</p>
          
          <div className="space-y-4 mt-5">
            {memberWorkload.map((mw) => (
              <div key={mw.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 w-1/3">
                  <span className="text-xs font-medium text-gray-200">{mw.name}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-[#151c2d] rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                      style={{ width: `${mw.tasks > 0 ? Math.min((mw.tasks / 5) * 100, 100) : 0}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 text-right">
                  <span className="text-xs font-semibold text-white font-mono">{mw.tasks} active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Health Quick Card */}
        <div className="bg-[#0b0f19] p-5 rounded-xl border border-[#151c2d] shadow-md flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white font-display tracking-tight">Project Spotlight</h4>
            <p className="text-xs text-gray-500 mt-1">Core Campaign Status</p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#090d16] border border-[#141b2c] space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Q3 Launch Campaign</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">ACTIVE</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Target date: August 1, 2026</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Milestone completeness</span>
                <span className="font-semibold text-white">75%</span>
              </div>
              <div className="w-full bg-[#151c2d] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>

          <div className="text-[10px] text-gray-600 font-mono text-center mt-3">
            Realtime DB Connected
          </div>
        </div>
      </div>
    </div>
  );
}
