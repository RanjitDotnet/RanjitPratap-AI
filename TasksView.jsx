// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState } from "react";
// import { Task, Project, TeamMember } from "../types";
// import { 
//   Plus, 
//   Trash2, 
//   Calendar, 
//   ArrowRight, 
//   ArrowLeft, 
//   CheckCircle2, 
//   AlertCircle, 
//   ChevronRight 
// } from "lucide-react";

// interface TasksViewProps {
//   tasks: Task[];
//   projects: Project[];
//   team: TeamMember[];
//   onAddTask: (task: Omit<Task, "id">) => void;
//   onUpdateTaskStatus: (id: string, status: Task["status"]) => void;
//   onUpdateTaskPriority: (id: string, priority: Task["priority"]) => void;
//   onDeleteTask: (id: string) => void;
// }

// const COLUMNS: Task["status"][] = ["Backlog", "Todo", "In Progress", "In Review", "Completed"];

// export default function TasksView({
//   tasks,
//   projects,
//   team,
//   onAddTask,
//   onUpdateTaskStatus,
//   onUpdateTaskPriority,
//   onDeleteTask,
// }: TasksViewProps) {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [title, setTitle] = useState("");
//   const [assigneeId, setAssigneeId] = useState(team[0]?.id || "");
//   const [projectId, setProjectId] = useState(projects[0]?.id || "");
//   const [priority, setPriority] = useState<Task["priority"]>("Medium");
//   const [dueDate, setDueDate] = useState("2026-07-15");
//   const [notes, setNotes] = useState("");
//   const [status, setStatus] = useState<Task["status"]>("Todo");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     onAddTask({
//       title,
//       status,
//       priority,
//       dueDate,
//       assigneeId,
//       projectId,
//       notes: notes.trim() || undefined,
//     });
//     setTitle("");
//     setNotes("");
//     setShowAddModal(false);
//   };

//   return (
//     <div id="tasks-view-container" className="space-y-6 py-2 select-none">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Tasks Board</h2>
//           <p className="text-sm text-gray-400 mt-1">Plan, prioritize, and drive team sprints using our interactive board columns.</p>
//         </div>
//         <button
//           id="btn-open-add-task"
//           onClick={() => setShowAddModal(true)}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
//         >
//           <Plus className="w-4 h-4" />
//           <span>New Task</span>
//         </button>
//       </div>

//       {/* Board Columns Grid */}
//       <div id="kanban-grid" className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
//         {COLUMNS.map((colName) => {
//           const colTasks = tasks.filter((t) => t.status === colName);
//           return (
//             <div
//               key={colName}
//               id={`kanban-col-${colName.replace(/\s+/g, '-').toLowerCase()}`}
//               className="bg-[#090d16] rounded-xl p-3 border border-[#141b2c] min-w-[220px] flex flex-col h-[calc(100vh-210px)]"
//             >
//               {/* Column Header */}
//               <div className="flex items-center justify-between mb-3 px-1.5 py-1">
//                 <div className="flex items-center space-x-2">
//                   <span className={`w-2 h-2 rounded-full ${
//                     colName === "Backlog" ? "bg-purple-500" :
//                     colName === "Todo" ? "bg-blue-500" :
//                     colName === "In Progress" ? "bg-amber-500" :
//                     colName === "In Review" ? "bg-indigo-500" :
//                     "bg-emerald-500"
//                   }`} />
//                   <h3 className="text-xs font-bold text-white tracking-tight uppercase font-mono">{colName}</h3>
//                 </div>
//                 <span className="text-[10px] font-bold font-mono text-gray-500 bg-[#141c2f] px-2 py-0.5 rounded-full">
//                   {colTasks.length}
//                 </span>
//               </div>

//               {/* Task Items List */}
//               <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
//                 {colTasks.map((task) => {
//                   const assignee = team.find((m) => m.id === task.assigneeId);
//                   const project = projects.find((p) => p.id === task.projectId);

//                   return (
//                     <div
//                       key={task.id}
//                       id={`task-card-${task.id}`}
//                       className="bg-[#0b0f19] p-3.5 rounded-lg border border-[#172237] hover:border-blue-500/30 hover:shadow-md transition-all duration-150 relative group"
//                     >
//                       {/* Priority and Actions */}
//                       <div className="flex items-center justify-between mb-2">
//                         <span className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded border uppercase ${
//                           task.priority === "Urgent" ? "bg-red-500/10 text-red-400 border-red-500/20" :
//                           task.priority === "High" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
//                           task.priority === "Medium" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
//                           "bg-gray-500/10 text-gray-400 border-gray-500/20"
//                         }`}>
//                           {task.priority}
//                         </span>

//                         <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                           {/* Left Arrow (Move status back) */}
//                           {COLUMNS.indexOf(colName) > 0 && (
//                             <button
//                               id={`btn-move-left-${task.id}`}
//                               onClick={() => onUpdateTaskStatus(task.id, COLUMNS[COLUMNS.indexOf(colName) - 1])}
//                               className="p-1 rounded bg-[#131b2e] hover:bg-blue-600/20 text-gray-400 hover:text-white transition-all cursor-pointer"
//                               title="Move back"
//                             >
//                               <ArrowLeft className="w-3 h-3" />
//                             </button>
//                           )}
                          
//                           {/* Right Arrow (Move status forward) */}
//                           {COLUMNS.indexOf(colName) < COLUMNS.length - 1 && (
//                             <button
//                               id={`btn-move-right-${task.id}`}
//                               onClick={() => onUpdateTaskStatus(task.id, COLUMNS[COLUMNS.indexOf(colName) + 1])}
//                               className="p-1 rounded bg-[#131b2e] hover:bg-blue-600/20 text-gray-400 hover:text-white transition-all cursor-pointer"
//                               title="Move next"
//                             >
//                               <ArrowRight className="w-3 h-3" />
//                             </button>
//                           )}

//                           <button
//                             id={`btn-delete-task-${task.id}`}
//                             onClick={() => onDeleteTask(task.id)}
//                             className="p-1 rounded bg-[#131b2e] hover:bg-red-950 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
//                             title="Delete Task"
//                           >
//                             <Trash2 className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h4 className="text-xs font-semibold text-white leading-normal tracking-tight mb-1">{task.title}</h4>

//                       {/* Notes snippet */}
//                       {task.notes && (
//                         <p className="text-[10px] text-gray-500 line-clamp-2 mb-3 bg-[#080d14]/40 p-1.5 rounded border border-[#141b2c]/40 leading-relaxed font-sans">
//                           {task.notes}
//                         </p>
//                       )}

//                       {/* Footer Row */}
//                       <div className="flex items-center justify-between pt-2 border-t border-[#131c2e] text-[10px] text-gray-500 font-mono">
//                         {/* Due Date */}
//                         <div className="flex items-center space-x-1">
//                           <Calendar className="w-3 h-3 text-gray-600" />
//                           <span>{task.dueDate.substring(5)}</span>
//                         </div>

//                         {/* Project Tag */}
//                         {project && (
//                           <span className="text-[9px] bg-[#141c2f] px-1.5 py-0.5 rounded text-gray-400 font-sans max-w-[80px] truncate">
//                             {project.name}
//                           </span>
//                         )}

//                         {/* Assignee Avatar */}
//                         {assignee ? (
//                           <div 
//                             className={`w-5 h-5 rounded-full ${assignee.color} flex items-center justify-center text-white text-[8px] font-bold shadow-sm`}
//                             title={`Assigned to: ${assignee.name}`}
//                           >
//                             {assignee.initials}
//                           </div>
//                         ) : (
//                           <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 text-[8px]">
//                             ?
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Add Task Modal */}
//       {showAddModal && (
//         <div id="add-task-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-[#0b0f19] border border-[#1d273f] rounded-xl p-6 max-w-md w-full shadow-2xl">
//             <h3 className="text-lg font-semibold text-white font-display mb-4">Create Board Task</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Task Title</label>
//                 <input
//                   id="input-task-title"
//                   type="text"
//                   required
//                   placeholder="e.g. Audit API integration keys"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Description / Notes</label>
//                 <textarea
//                   id="input-task-notes"
//                   rows={2}
//                   placeholder="Briefly state target scope..."
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-blue-500 resize-none"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Assignee</label>
//                   <select
//                     id="select-task-assignee"
//                     value={assigneeId}
//                     onChange={(e) => setAssigneeId(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     {team.map((m) => (
//                       <option key={m.id} value={m.id}>{m.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Campaign Project</label>
//                   <select
//                     id="select-task-project"
//                     value={projectId}
//                     onChange={(e) => setProjectId(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                   >
//                     {projects.map((p) => (
//                       <option key={p.id} value={p.id}>{p.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Status Column</label>
//                   <select
//                     id="select-task-status"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value as Task["status"])}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500"
//                   >
//                     {COLUMNS.map(col => (
//                       <option key={col} value={col}>{col}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Priority</label>
//                   <select
//                     id="select-task-priority"
//                     value={priority}
//                     onChange={(e) => setPriority(e.target.value as Task["priority"])}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                     <option value="Urgent">Urgent</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Due Date</label>
//                   <input
//                     id="input-task-due"
//                     type="date"
//                     required
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                     className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#151c2d] mt-6">
//                 <button
//                   id="btn-close-task-modal"
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="bg-[#151c2d] text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   id="btn-submit-task"
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
//                 >
//                   Post Task
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
import { 
  Plus, 
  Trash2, 
  Calendar, 
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";

const COLUMNS = ["Backlog", "Todo", "In Progress", "In Review", "Completed"];

export default function TasksView({
  tasks,
  projects,
  team,
  onAddTask,
  onUpdateTaskStatus,
  onUpdateTaskPriority,
  onDeleteTask,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState(team[0]?.id || "");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("2026-07-15");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title,
      status,
      priority,
      dueDate,
      assigneeId,
      projectId,
      notes: notes.trim() || undefined,
    });
    setTitle("");
    setNotes("");
    setShowAddModal(false);
  };

  return (
    <div id="tasks-view-container" className="space-y-6 py-2 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight font-display">Tasks Board</h2>
          <p className="text-sm text-gray-400 mt-1">Plan, prioritize, and drive team sprints using our interactive board columns.</p>
        </div>
        <button
          id="btn-open-add-task"
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-blue-950/20 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Board Columns Grid */}
      <div id="kanban-grid" className="grid grid-cols-1 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((colName) => {
          const colTasks = tasks.filter((t) => t.status === colName);
          return (
            <div
              key={colName}
              id={`kanban-col-${colName.replace(/\s+/g, '-').toLowerCase()}`}
              className="bg-[#090d16] rounded-xl p-3 border border-[#141b2c] min-w-[220px] flex flex-col h-[calc(100vh-210px)]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1.5 py-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    colName === "Backlog" ? "bg-purple-500" :
                    colName === "Todo" ? "bg-blue-500" :
                    colName === "In Progress" ? "bg-amber-500" :
                    colName === "In Review" ? "bg-indigo-500" :
                    "bg-emerald-500"
                  }`} />
                  <h3 className="text-xs font-bold text-white tracking-tight uppercase font-mono">{colName}</h3>
                </div>
                <span className="text-[10px] font-bold font-mono text-gray-500 bg-[#141c2f] px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Items List */}
              <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
                {colTasks.map((task) => {
                  const assignee = team.find((m) => m.id === task.assigneeId);
                  const project = projects.find((p) => p.id === task.projectId);

                  return (
                    <div
                      key={task.id}
                      id={`task-card-${task.id}`}
                      className="bg-[#0b0f19] p-3.5 rounded-lg border border-[#172237] hover:border-blue-500/30 hover:shadow-md transition-all duration-150 relative group"
                    >
                      {/* Priority and Actions */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded border uppercase ${
                          task.priority === "Urgent" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          task.priority === "High" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          task.priority === "Medium" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        }`}>
                          {task.priority}
                        </span>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Left Arrow (Move status back) */}
                          {COLUMNS.indexOf(colName) > 0 && (
                            <button
                              id={`btn-move-left-${task.id}`}
                              onClick={() => onUpdateTaskStatus(task.id, COLUMNS[COLUMNS.indexOf(colName) - 1])}
                              className="p-1 rounded bg-[#131b2e] hover:bg-blue-600/20 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Move back"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          
                          {/* Right Arrow (Move status forward) */}
                          {COLUMNS.indexOf(colName) < COLUMNS.length - 1 && (
                            <button
                              id={`btn-move-right-${task.id}`}
                              onClick={() => onUpdateTaskStatus(task.id, COLUMNS[COLUMNS.indexOf(colName) + 1])}
                              className="p-1 rounded bg-[#131b2e] hover:bg-blue-600/20 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Move next"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            id={`btn-delete-task-${task.id}`}
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 rounded bg-[#131b2e] hover:bg-red-950 text-gray-500 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-semibold text-white leading-normal tracking-tight mb-1">{task.title}</h4>

                      {/* Notes snippet */}
                      {task.notes && (
                        <p className="text-[10px] text-gray-500 line-clamp-2 mb-3 bg-[#080d14]/40 p-1.5 rounded border border-[#141b2c]/40 leading-relaxed font-sans">
                          {task.notes}
                        </p>
                      )}

                      {/* Footer Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#131c2e] text-[10px] text-gray-500 font-mono">
                        {/* Due Date */}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-600" />
                          <span>{task.dueDate.substring(5)}</span>
                        </div>

                        {/* Project Tag */}
                        {project && (
                          <span className="text-[9px] bg-[#141c2f] px-1.5 py-0.5 rounded text-gray-400 font-sans max-w-[80px] truncate">
                            {project.name}
                          </span>
                        )}

                        {/* Assignee Avatar */}
                        {assignee ? (
                          <div 
                            className={`w-5 h-5 rounded-full ${assignee.color} flex items-center justify-center text-white text-[8px] font-bold shadow-sm`}
                            title={`Assigned to: ${assignee.name}`}
                          >
                            {assignee.initials}
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 text-[8px]">
                            ?
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div id="add-task-modal" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0f19] border border-[#1d273f] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white font-display mb-4">Create Board Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Task Title</label>
                <input
                  id="input-task-title"
                  type="text"
                  required
                  placeholder="e.g. Audit API integration keys"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Description / Notes</label>
                <textarea
                  id="input-task-notes"
                  rows={2}
                  placeholder="Briefly state target scope..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Assignee</label>
                  <select
                    id="select-task-assignee"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {team.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Campaign Project</label>
                  <select
                    id="select-task-project"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Status Column</label>
                  <select
                    id="select-task-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                  >
                    {COLUMNS.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Priority</label>
                  <select
                    id="select-task-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1">Due Date</label>
                  <input
                    id="input-task-due"
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#070a12] border border-[#1d273f] text-gray-200 px-2 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#151c2d] mt-6">
                <button
                  id="btn-close-task-modal"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-[#151c2d] text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-task"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Post Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
