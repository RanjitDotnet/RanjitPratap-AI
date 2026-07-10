// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState } from "react";
// import { Project, TeamMember } from "../types";
// import { Briefcase, Calendar, CheckSquare, Plus, Trash2, User } from "lucide-react";

// interface ProjectsViewProps {
//   projects: Project[];
//   team: TeamMember[];
//   onAddProject: (project: Omit<Project, "id" | "tasksCount" | "tasksCompleted">) => void;
//   onUpdateProjectStatus: (id: string, status: Project["status"]) => void;
//   onUpdateProjectProgress: (id: string, progress: number) => void;
//   onDeleteProject: (id: string) => void;
// }

// export default function ProjectsView({
//   projects,
//   team,
//   onAddProject,
//   onUpdateProjectStatus,
//   onUpdateProjectProgress,
//   onDeleteProject,
// }: ProjectsViewProps) {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [name, setName] = useState("");
//   const [owner, setOwner] = useState(team[0]?.name || "");
//   const [dueDate, setDueDate] = useState("2026-09-30");
//   const [status, setStatus] = useState<Project["status"]>("Planning");
//   const [progress, setProgress] = useState(10);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) return;
//     onAddProject({
//       name,
//       owner,
//       dueDate,
//       status,
//       progress,
//     });
//     setName("");
//     setShowAddModal(false);
//   };

//   return (
//     <div id="projects-view-container" className="space-y-6 max-w-5xl mx-auto py-2">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Projects</h2>
//           <p className="text-sm text-gray-400 mt-1">Manage core team campaigns, sprints, and strategic boards.</p>
//         </div>
//         <button
//           id="btn-open-add-project"
//           onClick={() => setShowAddModal(true)}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
//         >
//           <Plus className="w-4 h-4" />
//           <span>New Project</span>
//         </button>
//       </div>

//       {/* Grid of Projects */}
//       <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {projects.map((proj) => {
//           // Find matching owner in team to get their initials
//           const matchingMember = team.find(m => m.name === proj.owner);
//           const initials = matchingMember ? matchingMember.initials : proj.owner.substring(0, 2).toUpperCase();
//           const avatarColor = matchingMember ? matchingMember.color : "bg-blue-600";

//           return (
//             <div
//               key={proj.id}
//               id={`project-card-${proj.id}`}
//               className="bg-[#0b0f19] rounded-xl p-5 border border-[#151c2d] flex flex-col justify-between hover:border-blue-500/30 hover:shadow-lg transition-all duration-200"
//             >
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   {/* Status Tag */}
//                   <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded border ${
//                     proj.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
//                     proj.status === "Completed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
//                     proj.status === "On Hold" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
//                     "bg-purple-500/10 text-purple-400 border-purple-500/20"
//                   }`}>
//                     {proj.status.toUpperCase()}
//                   </span>

//                   {/* Actions */}
//                   <div className="flex items-center space-x-2">
//                     <select
//                       id={`project-status-select-${proj.id}`}
//                       value={proj.status}
//                       onChange={(e) => onUpdateProjectStatus(proj.id, e.target.value as Project["status"])}
//                       className="bg-[#070a12] border border-[#1c273e] text-gray-400 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:border-blue-500 font-semibold"
//                     >
//                       <option value="Planning">Planning</option>
//                       <option value="Active">Active</option>
//                       <option value="On Hold">On Hold</option>
//                       <option value="Completed">Completed</option>
//                     </select>

//                     <button
//                       id={`btn-delete-project-${proj.id}`}
//                       onClick={() => onDeleteProject(proj.id)}
//                       className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-[#121a2c] transition-colors cursor-pointer"
//                       title="Delete Campaign"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>

//                 <h3 className="text-lg font-semibold text-white tracking-tight font-display mb-1">{proj.name}</h3>
//                 <p className="text-xs text-gray-400 mb-5 flex items-center space-x-2">
//                   <Calendar className="w-3.5 h-3.5 text-gray-500" />
//                   <span>Target date: <span className="font-mono text-gray-300">{proj.dueDate}</span></span>
//                 </p>

//                 {/* Progress bar */}
//                 <div className="space-y-1 mb-4">
//                   <div className="flex justify-between text-xs font-medium text-gray-400">
//                     <span>Campaign Completeness</span>
//                     <span className="text-white font-mono">{proj.progress}%</span>
//                   </div>
//                   <div className="w-full bg-[#151c2d] rounded-full h-1.5 overflow-hidden">
//                     <div
//                       className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
//                       style={{ width: `${proj.progress}%` }}
//                     />
//                   </div>
//                   {/* Slider to adjust progress */}
//                   <div className="pt-2 flex items-center space-x-2">
//                     <span className="text-[9px] text-gray-500 uppercase font-mono font-bold">Tune progress:</span>
//                     <input
//                       id={`project-progress-slider-${proj.id}`}
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={proj.progress}
//                       onChange={(e) => onUpdateProjectProgress(proj.id, parseInt(e.target.value))}
//                       className="flex-1 accent-blue-500 h-1 cursor-pointer bg-[#151c2d]"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Owner and Stats footer */}
//               <div className="border-t border-[#151c2d] pt-4 mt-3 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <div className={`w-6 h-6 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-[9px]`}>
//                     {initials}
//                   </div>
//                   <span className="text-xs text-gray-300 font-medium">{proj.owner}</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
//                   <span className="flex items-center space-x-1">
//                     <CheckSquare className="w-3.5 h-3.5 text-gray-600" />
//                     <span>{proj.tasksCompleted}/{proj.tasksCount} Tasks</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Add Project Modal */}
//       {showAddModal && (
//         <div id="add-project-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-[#0b0f19] border border-[#1d273f] rounded-xl p-6 max-w-md w-full shadow-2xl">
//             <h3 className="text-lg font-semibold text-white font-display mb-4">Create New Campaign</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Campaign Name</label>
//                 <input
//                   id="input-project-name"
//                   type="text"
//                   required
//                   placeholder="e.g. Q4 Growth Sprint"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Owner</label>
//                   <select
//                     id="select-project-owner"
//                     value={owner}
//                     onChange={(e) => setOwner(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     {team.map(m => (
//                       <option key={m.id} value={m.name}>{m.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Target Date</label>
//                   <input
//                     id="input-project-due"
//                     type="date"
//                     required
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Status</label>
//                   <select
//                     id="select-project-status"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as Project["status"])}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="Planning">Planning</option>
//                     <option value="Active">Active</option>
//                     <option value="On Hold">On Hold</option>
//                     <option value="Completed">Completed</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Initial Progress %</label>
//                   <input
//                     id="input-project-progress"
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={progress}
//                     onChange={(e) => setProgress(parseInt(e.target.value))}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#151c2d] mt-6">
//                 <button
//                   id="btn-close-project-modal"
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="bg-[#151c2d] text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   id="btn-submit-project"
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
//                 >
//                   Create Campaign
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


//** corrected code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Calendar, CheckSquare, Plus, Trash2 } from "lucide-react";

export default function ProjectsView({
  projects,
  team,
  onAddProject,
  onUpdateProjectStatus,
  onUpdateProjectProgress,
  onDeleteProject,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(team[0]?.name || "");
  const [dueDate, setDueDate] = useState("2026-09-30");
  const [status, setStatus] = useState("Planning");
  const [progress, setProgress] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddProject({
      name,
      owner,
      dueDate,
      status,
      progress,
    });
    setName("");
    setShowAddModal(false);
  };

  return (
    <div id="projects-view-container" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Projects</h2>
          <p className="text-sm text-gray-400 mt-1">Manage core team campaigns, sprints, and strategic boards.</p>
        </div>
        <button
          id="btn-open-add-project"
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => {
          // Find matching owner in team to get their initials
          const matchingMember = team.find(m => m.name === proj.owner);
          const initials = matchingMember ? matchingMember.initials : proj.owner.substring(0, 2).toUpperCase();
          const avatarColor = matchingMember ? matchingMember.color : "bg-blue-600";

          return (
            <div
              key={proj.id}
              id={`project-card-${proj.id}`}
              className="bg-[#0b0f19] rounded-xl p-5 border border-[#151c2d] flex flex-col justify-between hover:border-blue-500/30 hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Status Tag */}
                  <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded border ${
                    proj.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    proj.status === "Completed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    proj.status === "On Hold" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-purple-500/10 text-purple-400 border-purple-500/20"
                  }`}>
                    {proj.status.toUpperCase()}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <select
                      id={`project-status-select-${proj.id}`}
                      value={proj.status}
                      onChange={(e) => onUpdateProjectStatus(proj.id, e.target.value)}
                      className="bg-[#070a12] border border-[#1c273e] text-gray-400 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:border-blue-500 font-semibold"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      id={`btn-delete-project-${proj.id}`}
                      onClick={() => onDeleteProject(proj.id)}
                      className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-[#121a2c] transition-colors cursor-pointer"
                      title="Delete Campaign"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white tracking-tight font-display mb-1">{proj.name}</h3>
                <p className="text-xs text-gray-400 mb-5 flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Target date: <span className="font-mono text-gray-300">{proj.dueDate}</span></span>
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs font-medium text-gray-400">
                    <span>Campaign Completeness</span>
                    <span className="text-white font-mono">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-[#151c2d] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                  {/* Slider to adjust progress */}
                  <div className="pt-2 flex items-center space-x-2">
                    <span className="text-[9px] text-gray-500 uppercase font-mono font-bold">Tune progress:</span>
                    <input
                      id={`project-progress-slider-${proj.id}`}
                      type="range"
                      min="0"
                      max="100"
                      value={proj.progress}
                      onChange={(e) => onUpdateProjectProgress(proj.id, parseInt(e.target.value))}
                      className="flex-1 accent-blue-500 h-1 cursor-pointer bg-[#151c2d]"
                    />
                  </div>
                </div>
              </div>

              {/* Owner and Stats footer */}
              <div className="border-t border-[#151c2d] pt-4 mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-[9px]`}>
                    {initials}
                  </div>
                  <span className="text-xs text-gray-300 font-medium">{proj.owner}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-mono">
                  <span className="flex items-center space-x-1">
                    <CheckSquare className="w-3.5 h-3.5 text-gray-600" />
                    <span>{proj.tasksCompleted}/{proj.tasksCount} Tasks</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div id="add-project-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f19] border border-[#1d273f] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white font-display mb-4">Create New Campaign</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Campaign Name</label>
                <input
                  id="input-project-name"
                  type="text"
                  required
                  placeholder="e.g. Q4 Growth Sprint"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Owner</label>
                  <select
                    id="select-project-owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {team.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Target Date</label>
                  <input
                    id="input-project-due"
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Status</label>
                  <select
                    id="select-project-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Initial Progress %</label>
                  <input
                    id="input-project-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value))}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#151c2d] mt-6">
                <button
                  id="btn-close-project-modal"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-[#151c2d] text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-project"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
