import { X, Plus, Pencil } from "lucide-react";
import TaskForm from "./TaskForm";

const TaskModal = ({ isOpen, task, onClose, onSubmit }) => {
  if (!isOpen) {
    return null;
  }

  const isEditing = Boolean(task);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0e13] shadow-2xl shadow-black/50"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              {isEditing ? <Pencil size={18} /> : <Plus size={19} />}
            </div>

            <div>
              <h2 className="font-[Space_Grotesk] text-lg font-semibold text-white">
                {isEditing ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {isEditing
                  ? "Update the task details below."
                  : "Add a new task to your workspace."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <TaskForm
            task={task}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;