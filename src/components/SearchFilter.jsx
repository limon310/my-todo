import { Search } from "lucide-react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <section className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2">
            <Search
              size={18}
              className="text-base-content/50"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className="grow"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </label>

          {/* Status */}
          <select
            className="select select-bordered w-full"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority */}
          <select
            className="select select-bordered w-full"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;