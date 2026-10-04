import {
  CalendarDays,
  Trash2,
  Pencil,
  CircleDot,
} from "lucide-react";

const statusStyles = {
  Pending: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400",
  },

  "In Progress": {
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    dot: "bg-blue-400",
  },

  Completed: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
  },
};

const priorityStyles = {
  Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  High: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const TaskCard = ({
  task,
  onStatusChange,
  onDelete,
  onEdit,
}) => {
  const status = statusStyles[task.status];

  return (
    <article
      className="
        group flex h-full flex-col
        rounded-2xl
        border border-white/[0.07]
        bg-white/[0.035]
        p-5
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-white/[0.12]
        hover:bg-white/[0.05]
        hover:shadow-xl hover:shadow-black/10
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`}
            />

            <h3
              className="
                truncate
                font-[Space_Grotesk]
                text-base
                font-semibold
                text-white
              "
            >
              {task.title}
            </h3>
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {task.description || "No description provided."}
          </p>
        </div>

        {/* Priority */}
        <span
          className={`
            shrink-0
            rounded-lg
            border
            px-2.5
            py-1
            text-[11px]
            font-semibold
            ${priorityStyles[task.priority]}
          `}
        >
          {task.priority}
        </span>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="my-5 border-t border-white/[0.06]" />

      {/* ================= FOOTER ================= */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Status */}
          <div className="relative">
            <select
              value={task.status}
              onChange={(event) =>
                onStatusChange(task.id, event.target.value)
              }
              className={`
                h-8
                cursor-pointer
                appearance-none
                rounded-lg
                border
                ${status.border}
                ${status.bg}
                pl-3
                pr-8
                text-xs
                font-medium
                ${status.text}
                outline-none
                transition
                hover:brightness-110
                focus:ring-1
                focus:ring-indigo-500/40
              `}
            >
              <option
                value="Pending"
                className="bg-[#101117] text-amber-400"
              >
                Pending
              </option>

              <option
                value="In Progress"
                className="bg-[#101117] text-blue-400"
              >
                In Progress
              </option>

              <option
                value="Completed"
                className="bg-[#101117] text-emerald-400"
              >
                Completed
              </option>
            </select>

            {/* Custom arrow */}
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Due date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-600">
            <CalendarDays size={14} />

            <span>{task.dueDate || "No date"}</span>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex shrink-0 items-center gap-1">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="
              cursor-pointer
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              text-xs
              font-medium
              text-slate-500
              whitespace-nowrap
              transition
              hover:border-indigo-400/20
              hover:bg-indigo-400/10
              hover:text-indigo-400
            "
          >
            <Pencil size={14} />
            <span>Edit</span>
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="
              cursor-pointer
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-lg
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              text-xs
              font-medium
              text-slate-500
              whitespace-nowrap
              transition
              hover:border-rose-400/20
              hover:bg-rose-400/10
              hover:text-rose-400
            "
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;