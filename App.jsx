/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import ProjectsView from "./components/ProjectsView";
import TasksView from "./components/TasksView";
import TeamView from "./components/TeamView";
import ActivityLogView from "./components/ActivityLogView";
import AdminConsoleView from "./components/AdminConsoleView";
import AiAssistantView from "./components/AiAssistantView";

// INITIAL CORE TEAM MEMBERS
const INITIAL_TEAM = [
  {
    id: "ak",
    name: "Aisha Khan",
    initials: "AK",
    color: "bg-purple-600",
    role: "Admin",
    status: "Online",
    email: "aisha.khan@polaris.io",
  },
  {
    id: "mr",
    name: "Marco Reyes",
    initials: "MR",
    color: "bg-blue-500",
    role: "Front End Dev",
    status: "In Meeting",
    email: "marco.reyes@polaris.io",
  },
  {
    id: "lm",
    name: "Lena Müller",
    initials: "LM",
    color: "bg-pink-500",
    role: "Compliance Lead",
    status: "Away",
    email: "lena.mueller@polaris.io",
  },
  {
    id: "dc",
    name: "Daniel Cho",
    initials: "DC",
    color: "bg-amber-500",
    role: "Full Stack Dev",
    status: "Online",
    email: "daniel.cho@polaris.io",
  },
  {
    id: "ps",
    name: "Priya Singh",
    initials: "PS",
    color: "bg-emerald-500",
    role: "QA Engineer",
    status: "Online",
    email: "priya.singh@polaris.io",
  },
  {
    id: "so",
    name: "Sam O'Brien",
    initials: "SO",
    color: "bg-red-500",
    role: "DevOps Engineer",
    status: "Offline",
    email: "sam.obrien@polaris.io",
  },
];

// INITIAL CORE PROJECTS
const INITIAL_PROJECTS = [
  {
    id: "p1",
    name: "Q3 Launch Campaign",
    status: "Active",
    progress: 75,
    owner: "Aisha Khan",
    dueDate: "2026-08-01",
    tasksCount: 4,
    tasksCompleted: 3,
  },
  {
    id: "p2",
    name: "Tax compliance review",
    status: "Planning",
    progress: 25,
    owner: "Lena Müller",
    dueDate: "2026-09-15",
    tasksCount: 2,
    tasksCompleted: 0,
  },
  {
    id: "p3",
    name: "Core Infrastructure",
    status: "Active",
    progress: 45,
    owner: "Sam O'Brien",
    dueDate: "2026-10-30",
    tasksCount: 3,
    tasksCompleted: 1,
  },
];

// INITIAL BOARD TASKS
const INITIAL_TASKS = [
  {
    id: "t1",
    title: "Offline mode spike",
    status: "Todo",
    priority: "High",
    dueDate: "2026-07-10",
    assigneeId: "mr",
    projectId: "p1",
    notes: "Analyze ServiceWorker sync mechanisms, offline DB caching configurations, and conflict resolution models.",
  },
  {
    id: "t2",
    title: "Auth flow rewrite",
    status: "In Review",
    priority: "Urgent",
    dueDate: "2026-07-05",
    assigneeId: "dc",
    projectId: "p3",
    notes: "Replace legacy OAuth wrappers with robust JWT state storage. Verify scopes and cookie expiration constraints.",
  },
  {
    id: "t3",
    title: "Press kit assets",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-06-28",
    assigneeId: "ps",
    projectId: "p1",
    notes: "Export final layout SVGs, branding visual standards, and promotional media cards for community distribution.",
  },
  {
    id: "t4",
    title: "Tax compliance review",
    status: "Backlog",
    priority: "Medium",
    dueDate: "2026-09-01",
    assigneeId: "lm",
    projectId: "p2",
    notes: "Cross-examine state and regional tax schedules. Compile structured report for audit review.",
  },
  {
    id: "t5",
    title: "Migrate subscription webhooks",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-07-20",
    assigneeId: "dc",
    projectId: "p3",
    notes: "Transition billing webhooks to newer SDK events. Configure retry logic queues and monitor logs.",
  },
];

// INITIAL FEED ACTIVITIES DIRECTLY MATCHING THE USER'S PROVIDED SCREENSHOT IMAGE
const INITIAL_ACTIVITIES = [
  {
    id: "a1",
    userId: "mr",
    userName: "Marco Reyes",
    userInitials: "MR",
    userColor: "bg-blue-500",
    action: "pushed due date on",
    targetName: "Offline mode spike",
    targetType: "Task",
    timestamp: "6/17/2026, 2:32:00 PM",
    statusLabel: "Updated",
  },
  {
    id: "a2",
    userId: "lm",
    userName: "Lena Müller",
    userInitials: "LM",
    userColor: "bg-pink-500",
    action: "added notes to",
    targetName: "Tax compliance review",
    targetType: "Task",
    timestamp: "6/17/2026, 2:00:00 PM",
    statusLabel: "Updated",
  },
  {
    id: "a3",
    userId: "ak",
    userName: "Aisha Khan",
    userInitials: "AK",
    userColor: "bg-purple-600",
    action: "assigned",
    targetName: "Migrate subscription webhooks",
    targetType: "Task",
    timestamp: "6/16/2026, 10:25:00 PM",
    statusLabel: "Assigned",
    assigneeName: "Daniel",
  },
  {
    id: "a4",
    userId: "dc",
    userName: "Daniel Cho",
    userInitials: "DC",
    userColor: "bg-amber-500",
    action: "moved",
    targetName: "Auth flow rewrite",
    targetType: "Task",
    timestamp: "6/16/2026, 7:38:00 PM",
    statusLabel: "Updated",
  },
  {
    id: "a5",
    userId: "ps",
    userName: "Priya Singh",
    userInitials: "PS",
    userColor: "bg-emerald-500",
    action: "completed",
    targetName: "Press kit assets",
    targetType: "Task",
    timestamp: "6/15/2026, 5:10:00 PM",
    statusLabel: "Completed",
  },
  {
    id: "a6",
    userId: "ak",
    userName: "Aisha Khan",
    userInitials: "AK",
    userColor: "bg-purple-600",
    action: "created project",
    targetName: "Q3 Launch Campaign",
    targetType: "Project",
    timestamp: "6/15/2026, 2:42:00 PM",
    statusLabel: "Created",
  },
  {
    id: "a7",
    userId: "so",
    userName: "Sam O'Brien",
    userInitials: "SO",
    userColor: "bg-red-500",
    action: "created task",
    targetName: "Migrate subscription webhooks",
    targetType: "Task",
    timestamp: "6/14/2026, 3:45:00 PM",
    statusLabel: "Created",
  },
];

// export default function App() {
function App() {
  // NAVIGATION ACTIVE TAB ("activity" selected by default, matching screenshot)
  const [currentTab, setCurrentTab] = useState("activity");

  // PERSISTED WORKSPACE STATE
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("polaris_tasks");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("polaris_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem("polaris_team");
    return saved ? JSON.parse(saved) : INITIAL_TEAM;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("polaris_activities");
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("polaris_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("polaris_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("polaris_team", JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem("polaris_activities", JSON.stringify(activities));
  }, [activities]);

  // TASK OPERATIONS
  const handleAddTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: "task-" + Date.now(),
    };
    
    setTasks((prev) => [newTask, ...prev]);

    // Log Activity Event
    const currentMember = team.find(m => m.id === newTaskData.assigneeId) || team[0];
    const logEvent = {
      id: "act-" + Date.now(),
      userId: currentMember.id,
      userName: currentMember.name,
      userInitials: currentMember.initials,
      userColor: currentMember.color,
      action: "created task",
      targetName: newTask.title,
      targetType: "Task",
      timestamp: new Date().toLocaleString(),
      statusLabel: "Created",
    };
    setActivities((prev) => [logEvent, ...prev]);

    // Update Projects Tasks Counts
    setProjects((prevProj) => prevProj.map((proj) => {
      if (proj.id === newTaskData.projectId) {
        return {
          ...proj,
          tasksCount: proj.tasksCount + 1,
        };
      }
      return proj;
    }));
  };

  const handleUpdateTaskStatus = (id, status) => {
    let taskTitle = "";
    let assigneeId = "";

    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.id === id) {
          taskTitle = t.title;
          assigneeId = t.assigneeId;
          return { ...t, status };
        }
        return t;
      });
    });

    // Determine event action statement
    let actionStr = "updated status on";
    let label = "Updated";

    if (status === "Completed") {
      actionStr = "completed";
      label = "Completed";
    } else if (status === "In Review") {
      actionStr = "moved to In Review";
    } else if (status === "In Progress") {
      actionStr = "started work on";
    }

    const currentMember = team.find(m => m.id === assigneeId) || team[0];
    const logEvent = {
      id: "act-" + Date.now(),
      userId: currentMember.id,
      userName: currentMember.name,
      userInitials: currentMember.initials,
      userColor: currentMember.color,
      action: actionStr,
      targetName: taskTitle,
      targetType: "Task",
      timestamp: new Date().toLocaleString(),
      statusLabel: label,
    };
    setActivities((prev) => [logEvent, ...prev]);

    // If task status changes to or from Completed, update the project counts
    setTasks((finalTasks) => {
      const updatedTask = finalTasks.find(t => t.id === id);
      if (updatedTask) {
        setProjects((prevProjects) => prevProjects.map((proj) => {
          if (proj.id === updatedTask.projectId) {
            const projTasks = finalTasks.filter(t => t.projectId === proj.id);
            const compCount = projTasks.filter(t => t.status === "Completed").length;
            return {
              ...proj,
              tasksCompleted: compCount,
              progress: projTasks.length > 0 ? Math.round((compCount / projTasks.length) * 100) : proj.progress,
            };
          }
          return proj;
        }));
      }
      return finalTasks;
    });
  };

  const handleUpdateTaskPriority = (id, priority) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, priority } : t));
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (taskToDelete) {
      setProjects((prevProjects) => prevProjects.map((proj) => {
        if (proj.id === taskToDelete.projectId) {
          const newTasksCount = Math.max(0, proj.tasksCount - 1);
          const wasCompleted = taskToDelete.status === "Completed";
          const newTasksCompleted = wasCompleted ? Math.max(0, proj.tasksCompleted - 1) : proj.tasksCompleted;
          return {
            ...proj,
            tasksCount: newTasksCount,
            tasksCompleted: newTasksCompleted,
            progress: newTasksCount > 0 ? Math.round((newTasksCompleted / newTasksCount) * 100) : 0,
          };
        }
        return proj;
      }));
    }
  };

  // PROJECT OPERATIONS
  const handleAddProject = (newProjData) => {
    const newProj = {
      ...newProjData,
      id: "proj-" + Date.now(),
      tasksCount: 0,
      tasksCompleted: 0,
    };

    setProjects((prev) => [newProj, ...prev]);

    // Log Activity
    const matchingMember = team.find(m => m.name === newProjData.owner) || team[0];
    const logEvent = {
      id: "act-" + Date.now(),
      userId: matchingMember.id,
      userName: matchingMember.name,
      userInitials: matchingMember.initials,
      userColor: matchingMember.color,
      action: "created project",
      targetName: newProj.name,
      targetType: "Project",
      timestamp: new Date().toLocaleString(),
      statusLabel: "Created",
    };
    setActivities((prev) => [logEvent, ...prev]);
  };

  const handleUpdateProjectStatus = (id, status) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, status } : p));
  };

  const handleUpdateProjectProgress = (id, progress) => {
    setProjects((prev) => prev.map((p) => p.id === id ? { ...p, progress } : p));
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    // Orphan tasks associated with deleted project
    setTasks((prevTasks) => prevTasks.filter((t) => t.projectId !== id));
  };

  // TEAM OPERATIONS
  const handleUpdateTeamStatus = (id, status) => {
    setTeam((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
  };

  // SIMULATE LIVE EVENTS AT RUNTIME (Appends custom interactive activities)
  const handleAddSimulatedEvent = () => {
    const randomActions = [
      { action: "pushed code refactoring on", label: "Updated" },
      { action: "reviewed compliance items in", label: "Updated" },
      { action: "approved active branch updates on", label: "Completed" },
      { action: "deployed system container for", label: "Created" }
    ];
    
    const randomAction = randomActions[Math.floor(Math.random() * randomActions.length)];
    const randomMember = team[Math.floor(Math.random() * team.length)];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)] || { title: "Auth rewrite guidelines" };

    const simulatedEvent = {
      id: "act-sim-" + Date.now(),
      userId: randomMember.id,
      userName: randomMember.name,
      userInitials: randomMember.initials,
      userColor: randomMember.color,
      action: randomAction.action,
      targetName: randomTask.title,
      targetType: "Task",
      timestamp: new Date().toLocaleString(),
      statusLabel: randomAction.label,
    };

    setActivities((prev) => [simulatedEvent, ...prev]);
  };

  // TELEMETRY FLUSHES & ORIGINAL RESET CORES
  const handleResetToOriginalState = () => {
    setTasks(INITIAL_TASKS);
    setProjects(INITIAL_PROJECTS);
    setTeam(INITIAL_TEAM);
    setActivities(INITIAL_ACTIVITIES);
    alert("Polaris Dashboard state fully restored to high-fidelity reference state!");
  };

  const handleClearAllData = () => {
    setTasks([]);
    setProjects([]);
    setActivities([]);
    alert("Cleared workspace logs. Boards are now pristine for customized entry.");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#080c14] text-gray-200">
      




      
      {/* LEFT COLUMN: BRAND NAVIGATION SIDEBAR */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        tasksCount={tasks.filter(t => t.status !== "Completed").length}
        projectsCount={projects.length}
        activityCount={activities.length}
        onLogout={handleResetToOriginalState}
      />

      {/* RIGHT COLUMN: MAIN CONTENT FEED VIEW WRAPPER */}
      <main id="main-content-area" className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {currentTab === "dashboard" && (
          <DashboardView 
            tasks={tasks}
            projects={projects}
            team={team}
          />
        )}

        {currentTab === "projects" && (
          <ProjectsView 
            projects={projects}
            team={team}
            onAddProject={handleAddProject}
            onUpdateProjectStatus={handleUpdateProjectStatus}
            onUpdateProjectProgress={handleUpdateProjectProgress}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {currentTab === "tasks" && (
          <TasksView 
            tasks={tasks}
            projects={projects}
            team={team}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onUpdateTaskPriority={handleUpdateTaskPriority}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentTab === "team" && (
          <TeamView 
            team={team}
            onUpdateStatus={handleUpdateTeamStatus}
          />
        )}

        {currentTab === "activity" && (
          <ActivityLogView 
            events={activities}
            onAddSimulatedEvent={handleAddSimulatedEvent}
            onClearEvents={handleResetToOriginalState}
          />
        )}

        {currentTab === "admin" && (
          <AdminConsoleView 
            onResetToImageState={handleResetToOriginalState}
            onClearAllData={handleClearAllData}
          />
        )}

               {currentTab === "ai-assistant" && (
          <AiAssistantView
            projects={projects}
            team={team}
            onAddTask={handleAddTask}
          />
        )}

      </main>
    </div>
  
      )
    }


export default App;

