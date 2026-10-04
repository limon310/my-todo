import { useState } from "react";
import {
  Plus,
  Search,
  LayoutDashboard,
  BarChart3,
  ListTodo,
} from "lucide-react";

import demoTasks from "../data/demoTasks";
import useLocalStorage from "../hooks/useLocalStorage";
import { getTaskStats, filterTasks } from "../utils/taskUtils";

import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import TaskModal from "../components/TaskModal";

const Dashboard = () => {
  const [tasks, setTasks] = useLocalStorage(
    "taskflow-tasks",
    demoTasks
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const stats = getTaskStats(tasks);

  const filteredTasks = filterTasks(
    tasks,
    searchTerm,
    statusFilter,
    priorityFilter
  );

  // -------------------------
  // Open Add Modal
  // -------------------------
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // -------------------------
  // Open Edit Modal
  // -------------------------
  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // -------------------------
  // Close Modal
  // -------------------------
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // -------------------------
  // Add / Update Task
  // -------------------------
  const handleTaskSubmit = (formData) => {
    // EDIT
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...formData,
              }
            : task
        )
      );
    }

    // ADD
    else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setTasks((previousTasks) => [
        newTask,
        ...previousTasks,
      ]);
    }

    handleCloseModal();
  };

  // -------------------------
  // Status Change
  // -------------------------
  const handleStatusChange = (id, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // -------------------------
  // Delete
  // -------------------------
  const handleDelete = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // -------------------------
  // Progress
  // -------------------------
  const progress =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#08090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <ListTodo size={19} />
            </div>

            <span className="font-[Space_Grotesk] text-lg font-bold">
              TaskFlow
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.025] p-1 md:flex">
            <button className="flex items-center gap-2 rounded-lg bg-white/[0.07] px-4 py-2 text-sm text-white">
              <LayoutDashboard size={15} />
              Dashboard
            </button>

            {/* <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-500 transition hover:text-white">
              <ListTodo size={15} />
              Tasks
            </button>

            <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-500 transition hover:text-white">
              <BarChart3 size={15} />
              Analytics
            </button> */}
          </div>

          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-bold text-indigo-300">
            LI
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6 lg:px-8">

        {/* Header */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-400">
              Wellcome Back, Limon.
            </p>

            <h1 className="font-[Space_Grotesk] text-3xl font-bold tracking-tight sm:text-4xl">
              Your workspace
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Stay organized and keep your work moving forward.
            </p>
          </div>

          <button
            onClick={handleAddTask}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-400"
          >
            <Plus size={18} />
            New Task
          </button>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            type="total"
          />

          <StatsCard
            title="Pending"
            value={stats.pending}
            type="pending"
          />

          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            type="inProgress"
          />

          <StatsCard
            title="Completed"
            value={stats.completed}
            type="completed"
          />
        </section>

        {/* Progress */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Overall Progress
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Keep going, you're doing great.
              </p>
            </div>

            <span className="text-sm font-bold text-indigo-400">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Search + Filters */}
        <section className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_180px]">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4">
            <Search size={18} className="text-slate-600" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-white/[0.07] bg-[#101117] px-4 py-3 text-sm text-slate-400 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
            className="rounded-xl border border-white/[0.07] bg-[#101117] px-4 py-3 text-sm text-slate-400 outline-none"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </section>

        {/* Tasks */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-[Space_Grotesk] text-xl font-bold">
                Your Tasks
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {filteredTasks.length} task
                {filteredTasks.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={handleCloseModal}
        onSubmit={handleTaskSubmit}
      />
    </main>
  );
};

export default Dashboard;