import { ListTodo } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="rounded-xl bg-base-100 py-16 text-center shadow-sm">
      <ListTodo
        size={42}
        className="mx-auto mb-3 text-base-content/30"
      />

      <h3 className="text-lg font-semibold">
        No tasks found
      </h3>

      <p className="mt-1 text-sm text-base-content/60">
        Try changing your search or filters.
      </p>
    </div>
  );
};

export default EmptyState;