interface InventoryFiltersProps {
  filters: InventoryFilters;
  categories: string[];
  onFilterChange: (filters: InventoryFilters) => void;
}

const InventoryFilters = ({
  filters,
  categories,
  onFilterChange,
}: InventoryFiltersProps) => (
  <div className="flex gap-4 mb-6">
    <input
      type="text"
      placeholder="Search items..."
      value={filters.search}
      onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <select
      title="Category"
      value={filters.category}
      onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    <select
      title="Sort by"
      value={filters.sortBy}
      onChange={(e) =>
        onFilterChange({
          ...filters,
          sortBy: e.target.value as SortField,
        })
      }
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="name">Sort by Name</option>
      <option value="quantity">Sort by Quantity</option>
      <option value="price">Sort by Price</option>
      <option value="category">Sort by Category</option>
    </select>
    <button
      onClick={() =>
        onFilterChange({
          ...filters,
          sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
        })
      }
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50
                transition-colors duration-200 ease-in-out"
    >
      {filters.sortOrder === "asc" ? "↑" : "↓"}
    </button>
  </div>
);

export default InventoryFilters;
