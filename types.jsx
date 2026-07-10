// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// export interface TeamMember {
//   id: string;
//   name: string;
//   initials: string;
//   color: string; // Tailwind bg color class
//   role: string;
//   status: 'Online' | 'Offline' | 'Away' | 'In Meeting';
//   email: string;
// }

// export interface Project {
//   id: string;
//   name: string;
//   status: 'Planning' | 'Active' | 'On Hold' | 'Completed';
//   progress: number; // 0 to 100
//   owner: string; // TeamMember name or ID
//   dueDate: string;
//   tasksCount: number;
//   tasksCompleted: number;
// }

// export interface Task {
//   id: string;
//   title: string;
//   status: 'Backlog' | 'Todo' | 'In Progress' | 'In Review' | 'Completed';
//   priority: 'Low' | 'Medium' | 'High' | 'Urgent';
//   dueDate: string;
//   assigneeId: string; // reference TeamMember id
//   projectId: string; // reference Project id
//   notes?: string;
// }

// export interface ActivityEvent {
//   id: string;
//   userId: string; // reference TeamMember id or direct initials
//   userName: string;
//   userInitials: string;
//   userColor: string; // Tailwind background color configuration
//   action: string; // e.g. "pushed due date on", "added notes to"
//   targetName: string; // e.g. "Offline mode spike"
//   targetType: 'Task' | 'Project' | 'Team';
//   timestamp: string; // format: "6/17/2026, 2:32:00 PM"
//   statusLabel: 'Updated' | 'Assigned' | 'Completed' | 'Created';
//   assigneeName?: string; // name of user assigned to (optional)
// }

// export interface ChatMessage {
//   id: string;
//   sender: 'user' | 'assistant';
//   text: string;
//   timestamp: string;
// }


//** corrected code */


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {string} initials
 * @property {string} color - Tailwind bg color class
 * @property {string} role
 * @property {'Online' | 'Offline' | 'Away' | 'In Meeting'} status
 * @property {string} email
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {'Planning' | 'Active' | 'On Hold' | 'Completed'} status
 * @property {number} progress - 0 to 100
 * @property {string} owner - TeamMember name or ID
 * @property {string} dueDate
 * @property {number} tasksCount
 * @property {number} tasksCompleted
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {'Backlog' | 'Todo' | 'In Progress' | 'In Review' | 'Completed'} status
 * @property {'Low' | 'Medium' | 'High' | 'Urgent'} priority
 * @property {string} dueDate
 * @property {string} assigneeId - reference TeamMember id
 * @property {string} projectId - reference Project id
 * @property {string} [notes]
 */

/**
 * @typedef {Object} ActivityEvent
 * @property {string} id
 * @property {string} userId - reference TeamMember id or direct initials
 * @property {string} userName
 * @property {string} userInitials
 * @property {string} userColor - Tailwind background color configuration
 * @property {string} action - e.g. "pushed due date on", "added notes to"
 * @property {string} targetName - e.g. "Offline mode spike"
 * @property {'Task' | 'Project' | 'Team'} targetType
 * @property {string} timestamp - format: "6/17/2026, 2:32:00 PM"
 * @property {'Updated' | 'Assigned' | 'Completed' | 'Created'} statusLabel
 * @property {string} [assigneeName] - name of user assigned to (optional)
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'user' | 'assistant'} sender
 * @property {string} text
 * @property {string} timestamp
 */

export {};
