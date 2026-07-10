// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { TeamMember } from "../types";
// import { Mail, Shield, User, Circle } from "lucide-react";

// interface TeamViewProps {
//   team: TeamMember[];
//   onUpdateStatus: (id: string, status: TeamMember["status"]) => void;
// }

// export default function TeamView({ team, onUpdateStatus }: TeamViewProps) {
//   return (
//     <div id="team-view-container" className="space-y-6 max-w-5xl mx-auto py-2">
//       {/* Header */}
//       <div>
//         <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Workspace Squad</h2>
//         <p className="text-sm text-gray-400 mt-1">Review teammates, contact details, operational roles, and live availability indicators.</p>
//       </div>

//       {/* Grid of Team Members */}
//       <div id="team-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {team.map((member) => (
//           <div
//             key={member.id}
//             id={`member-card-${member.id}`}
//             className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 hover:border-blue-500/30 hover:shadow-lg transition-all duration-150 flex flex-col justify-between"
//           >
//             <div>
//               {/* Profile Header */}
//               <div className="flex items-center space-x-3.5 mb-4">
//                 <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-base shadow-md ring-2 ring-[#0c1221]`}>
//                   {member.initials}
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-white leading-snug">{member.name}</h3>
//                   <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
//                     <Shield className="w-3.5 h-3.5 text-blue-400" />
//                     <span>{member.role}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Status and Toggle */}
//               <div className="bg-[#080d14]/60 p-3.5 rounded-lg border border-[#141b2c] space-y-2 mb-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] uppercase font-mono font-bold text-gray-500">Current Presence</span>
//                   <span className="flex items-center space-x-1.5">
//                     <Circle className={`w-2.5 h-2.5 fill-current ${
//                       member.status === 'Online' ? 'text-emerald-500' :
//                       member.status === 'Away' ? 'text-amber-500' :
//                       member.status === 'In Meeting' ? 'text-purple-500' : 'text-gray-500'
//                     }`} />
//                     <span className="text-xs font-semibold text-gray-300">{member.status}</span>
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between pt-2 border-t border-[#1a2336]/40">
//                   <span className="text-[9px] text-gray-500 font-mono">Set status:</span>
//                   <select
//                     id={`status-toggle-${member.id}`}
//                     value={member.status}
//                     onChange={(e) => onUpdateStatus(member.id, e.target.value as TeamMember["status"])}
//                     className="bg-[#070a12] border border-[#192336] text-gray-300 text-[10px] font-semibold rounded px-1.5 py-0.5 focus:outline-none focus:border-blue-500 cursor-pointer"
//                   >
//                     <option value="Online">Online</option>
//                     <option value="Offline">Offline</option>
//                     <option value="Away">Away</option>
//                     <option value="In Meeting">In Meeting</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Email Contact info */}
//             <div className="border-t border-[#151c2d] pt-3.5 flex items-center justify-between text-xs">
//               <span className="text-gray-500 flex items-center space-x-1.5">
//                 <Mail className="w-3.5 h-3.5 text-gray-600" />
//                 <span className="font-mono text-gray-400 select-all">{member.email}</span>
//               </span>
//               <span className="text-[10px] font-semibold text-blue-400 hover:underline cursor-pointer">
//                 Message
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


//** corrected code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Shield, Circle } from "lucide-react";

export default function TeamView({ team, onUpdateStatus }) {
  return (
    <div id="team-view-container" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Workspace Squad</h2>
        <p className="text-sm text-gray-400 mt-1">Review teammates, contact details, operational roles, and live availability indicators.</p>
      </div>

      {/* Grid of Team Members */}
      <div id="team-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member) => (
          <div
            key={member.id}
            id={`member-card-${member.id}`}
            className="bg-[#0b0f19] border border-[#151c2d] rounded-xl p-5 hover:border-blue-500/30 hover:shadow-lg transition-all duration-150 flex flex-col justify-between"
          >
            <div>
              {/* Profile Header */}
              <div className="flex items-center space-x-3.5 mb-4">
                <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-base shadow-md ring-2 ring-[#0c1221]`}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{member.name}</h3>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>

              {/* Status and Toggle */}
              <div className="bg-[#080d14]/60 p-3.5 rounded-lg border border-[#141b2c] space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold text-gray-500">Current Presence</span>
                  <span className="flex items-center space-x-1.5">
                    <Circle className={`w-2.5 h-2.5 fill-current ${
                      member.status === 'Online' ? 'text-emerald-500' :
                      member.status === 'Away' ? 'text-amber-500' :
                      member.status === 'In Meeting' ? 'text-purple-500' : 'text-gray-500'
                    }`} />
                    <span className="text-xs font-semibold text-gray-300">{member.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1a2336]/40">
                  <span className="text-[9px] text-gray-500 font-mono">Set status:</span>
                  <select
                    id={`status-toggle-${member.id}`}
                    value={member.status}
                    onChange={(e) => onUpdateStatus(member.id, e.target.value)}
                    className="bg-[#070a12] border border-[#192336] text-gray-300 text-[10px] font-semibold rounded px-1.5 py-0.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Away">Away</option>
                    <option value="In Meeting">In Meeting</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Email Contact info */}
            <div className="border-t border-[#151c2d] pt-3.5 flex items-center justify-between text-xs">
              <span className="text-gray-500 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-600" />
                <span className="font-mono text-gray-400 select-all">{member.email}</span>
              </span>
              <span className="text-[10px] font-semibold text-blue-400 hover:underline cursor-pointer">
                Message
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
