import { useEffect, useState } from "react";
import { CalendarDays, FileText, Flag, Type } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
};

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialForm);

  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    onSubmit(formData);

    if (!isEditing) {
      setFormData(initialForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
          <Type size={15} />
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Build authentication system"
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.06]"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
          <FileText size={15} />
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what needs to be done..."
          rows={4}
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-white/[0.06]"
        />
      </div>

      {/* Priority + Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
            <Flag size={15} />
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/[0.08] bg-[#101117] px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 text-sm font-medium text-slate-300">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/[0.08] bg-[#101117] px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
          <CalendarDays size={15} />
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400"
        >
          {isEditing ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;