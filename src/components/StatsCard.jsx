import {
  CheckCircle2,
  Clock3,
  ListTodo,
  CircleDot,
} from "lucide-react";

const iconMap = {
  total: ListTodo,
  pending: Clock3,
  inProgress: CircleDot,
  completed: CheckCircle2,
};

const StatsCard = ({ title, value, type }) => {
  const Icon = iconMap[type];

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/60">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>
          </div>

          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Icon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;