export const getTaskStats = (tasks) => {
  return {
    total: tasks.length,

    pending: tasks.filter((task) => task.status === "Pending").length,

    inProgress: tasks.filter(
      (task) => task.status === "In Progress"
    ).length,

    completed: tasks.filter(
      (task) => task.status === "Completed"
    ).length,
  };
};

export const filterTasks = (
  tasks,
  searchTerm = "",
  statusFilter = "All",
  priorityFilter = "All"
) => {
  return tasks.filter((task) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};