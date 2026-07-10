// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { 
//   LayoutDashboard, 
//   Briefcase, 
//   CheckSquare, 
//   Users, 
//   Activity, 
//   ShieldCheck, 
//   Sparkles, 
//   LogOut,
//   Terminal
// } from "lucide-react";

// interface SidebarProps {
//   currentTab: string;
//   setCurrentTab: (tab: string) => void;
//   tasksCount: number;
//   projectsCount: number;
//   activityCount: number;
//   onLogout: () => void;
// }

// export default function Sidebar({ 
//   currentTab, 
//   setCurrentTab, 
//   tasksCount, 
//   projectsCount,
//   activityCount,
//   onLogout
// }: SidebarProps) {
  
//   const navItems = [
//     { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
//     { id: "projects", label: "Projects", icon: Briefcase, count: projectsCount },
//     { id: "tasks", label: "Tasks", icon: CheckSquare, count: tasksCount },
//     { id: "team", label: "Team", icon: Users },
//     { id: "activity", label: "Activity", icon: Activity, count: activityCount },
//   ];

//   return (
//     <aside id="sidebar-container" className="w-64 bg-[#090d16] border-r border-[#151c2d] flex flex-col justify-between h-screen sticky top-0 text-gray-400 font-sans select-none flex-shrink-0">
//       {/* Brand Header */}
//       <div>
//         <div id="sidebar-header" className="p-6 flex items-center space-x-3 border-b border-[#151c2d]">
//           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/30">
//             P
//           </div>
//           <div>
//             <h1 className="text-white font-semibold font-display tracking-tight text-base">Polaris</h1>
//             <p className="text-xs text-gray-500 font-mono">Project OS</p>
//           </div>
//         </div>

//         {/* Navigation Section */}
//         <nav className="p-4 space-y-1">
//           <p className="px-3 text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2 font-mono">WORKSPACE</p>
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = currentTab === item.id;
//             return (
//               <button
//                 key={item.id}
//                 id={`nav-${item.id}`}
//                 onClick={() => setCurrentTab(item.id)}
//                 className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
//                   isActive 
//                     ? "bg-[#141b2c] text-white shadow-sm border-l-2 border-blue-500 pl-2.5" 
//                     : "hover:bg-[#0e1424] hover:text-gray-200"
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <Icon className={`w-[18px] h-[18px] ${isActive ? "text-blue-400" : "text-gray-500"}`} />
//                   <span>{item.label}</span>
//                 </div>
//                 {item.count !== undefined && item.count > 0 && (
//                   <span className={`text-[10px] font-semibold font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-blue-600/30 text-blue-300' : 'bg-[#151e31] text-gray-500'}`}>
//                     {item.count}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Admin Navigation */}
//         <div className="px-4 py-2 border-t border-[#151c2d]/70 mt-2">
//           <p className="px-3 text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2 font-mono">ADMIN</p>
//           <button
//             id="nav-admin"
//             onClick={() => setCurrentTab("admin")}
//             className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
//               currentTab === "admin" 
//                 ? "bg-[#141b2c] text-white border-l-2 border-blue-500 pl-2.5" 
//                 : "hover:bg-[#0e1424] hover:text-gray-200"
//             }`}
//           >
//             <ShieldCheck className={`w-[18px] h-[18px] ${currentTab === "admin" ? "text-blue-400" : "text-gray-500"}`} />
//             <span>Admin console</span>
//           </button>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="p-4 border-t border-[#151c2d] space-y-4">
//         {/* AI Copilot Promo Button */}
//         <button
//           id="nav-ai-assistant"
//           onClick={() => setCurrentTab("ai-assistant")}
//           className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//             currentTab === "ai-assistant"
//               ? "bg-gradient-to-r from-blue-900/40 to-purple-950/40 text-purple-200 border border-purple-500/40 shadow-purple-950/30 shadow-md"
//               : "bg-gradient-to-r from-blue-950/30 to-purple-950/30 text-purple-300 border border-purple-900/30 hover:border-purple-800/50"
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             <Sparkles className="w-[18px] h-[18px] text-purple-400 animate-pulse" />
//             <span className="font-display">AI Assistant</span>
//           </div>
//           <span className="bg-purple-600/20 text-purple-300 text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider border border-purple-500/20 font-bold">
//             Live
//           </span>
//         </button>

//         {/* User Card */}
//         <div id="user-profile-card" className="flex items-center justify-between p-2 rounded-lg bg-[#0c1221] border border-[#141d31]">
//           <div className="flex items-center space-x-2.5">
//             <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
//               AK
//             </div>
//             <div className="leading-none">
//               <h4 className="text-white font-medium text-xs">Aisha Khan</h4>
//               <span className="text-[10px] text-gray-500 font-mono">Admin</span>
//             </div>
//           </div>
//           <button 
//             id="btn-sign-out"
//             title="Sign out / Reset"
//             onClick={onLogout}
//             className="p-1.5 rounded-md text-gray-500 hover:bg-[#151e31] hover:text-white transition-colors duration-100 cursor-pointer"
//           >
//             <LogOut className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }



//** corrected code */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  LogOut
} from "lucide-react";

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  tasksCount, 
  projectsCount,
  activityCount,
  onLogout
}) {
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase, count: projectsCount },
    { id: "tasks", label: "Tasks", icon: CheckSquare, count: tasksCount },
    { id: "team", label: "Team", icon: Users },
    { id: "activity", label: "Activity", icon: Activity, count: activityCount },
  ];

  return (
    <aside id="sidebar-container" className="w-64 bg-[#090d16] border-r border-[#151c2d] flex flex-col justify-between h-screen sticky top-0 text-gray-400 font-sans select-none flex-shrink-0">
      {/* Brand Header */}
      <div>
        <div id="sidebar-header" className="p-6 flex items-center space-x-3 border-b border-[#151c2d]">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/30">
            P
          </div>
          <div>
            <h1 className="text-white font-semibold font-display tracking-tight text-base">Polaris</h1>
            <p className="text-xs text-gray-500 font-mono">Project OS</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 space-y-1">
          <p className="px-3 text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2 font-mono">WORKSPACE</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive 
                    ? "bg-[#141b2c] text-white shadow-sm border-l-2 border-blue-500 pl-2.5" 
                    : "hover:bg-[#0e1424] hover:text-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-[18px] h-[18px] ${isActive ? "text-blue-400" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] font-semibold font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-blue-600/30 text-blue-300' : 'bg-[#151e31] text-gray-500'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Navigation */}
        <div className="px-4 py-2 border-t border-[#151c2d]/70 mt-2">
          <p className="px-3 text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-2 font-mono">ADMIN</p>
          <button
            id="nav-admin"
            onClick={() => setCurrentTab("admin")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              currentTab === "admin" 
                ? "bg-[#141b2c] text-white border-l-2 border-blue-500 pl-2.5" 
                : "hover:bg-[#0e1424] hover:text-gray-200"
            }`}
          >
            <ShieldCheck className={`w-[18px] h-[18px] ${currentTab === "admin" ? "text-blue-400" : "text-gray-500"}`} />
            <span>Admin console</span>
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-[#151c2d] space-y-4">
        {/* AI Copilot Promo Button */}
        <button
          id="nav-ai-assistant"
          onClick={() => setCurrentTab("ai-assistant")}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentTab === "ai-assistant"
              ? "bg-gradient-to-r from-blue-900/40 to-purple-950/40 text-purple-200 border border-purple-500/40 shadow-purple-950/30 shadow-md"
              : "bg-gradient-to-r from-blue-950/30 to-purple-950/30 text-purple-300 border border-purple-900/30 hover:border-purple-800/50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Sparkles className="w-[18px] h-[18px] text-purple-400 animate-pulse" />
            <span className="font-display">AI Assistant</span>
          </div>
          <span className="bg-purple-600/20 text-purple-300 text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider border border-purple-500/20 font-bold">
            Live
          </span>
        </button>

        {/* User Card */}
        <div id="user-profile-card" className="flex items-center justify-between p-2 rounded-lg bg-[#0c1221] border border-[#141d31]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
              AK
            </div>
            <div className="leading-none">
              <h4 className="text-white font-medium text-xs">Aisha Khan</h4>
              <span className="text-[10px] text-gray-500 font-mono">Admin</span>
            </div>
          </div>
          <button 
            id="btn-sign-out"
            title="Sign out / Reset"
            onClick={onLogout}
            className="p-1.5 rounded-md text-gray-500 hover:bg-[#151e31] hover:text-white transition-colors duration-100 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

