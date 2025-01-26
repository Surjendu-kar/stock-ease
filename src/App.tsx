import { useState, useEffect } from "react";
import {
  getStoredInventory,
  updateItem,
  deleteItem,
  addItem,
  getCategories,
} from "./utils/inventoryUtils";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const App = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filters, setFilters] = useState<InventoryFilters>({
    category: "",
    sortBy: "name",
    sortOrder: "asc",
    search: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setItems(getStoredInventory());
    setCategories(getCategories());
  }, []);

  const handleAddItem = (
    newItem: Omit<InventoryItem, "id" | "lastUpdated">
  ) => {
    const item = addItem(newItem);
    setItems((prev) => [...prev, item]);
    setIsAddModalOpen(false);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    updateItem(updatedItem);
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = items
    .filter(
      (item) =>
        (!filters.category || item.category === filters.category) &&
        (!filters.search ||
          item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.category.toLowerCase().includes(filters.search.toLowerCase()))
    )
    .sort((a, b) => {
      const order = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "quantity")
        return (a.quantity - b.quantity) * order;
      if (filters.sortBy === "price") return (a.price - b.price) * order;
      return a[filters.sortBy].localeCompare(b[filters.sortBy]) * order;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 active:scale-90 text-white px-4 py-2 rounded-lg
                     transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
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
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SortField,
                }))
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
                setFilters((prev) => ({
                  ...prev,
                  sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                }))
              }
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50
                       transition-colors duration-200 ease-in-out"
            >
              {filters.sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ease-in-out
                                              ${
                                                item.quantity < 10
                                                  ? "bg-red-50"
                                                  : ""
                                              }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`${
                            item.quantity < 10 ? "text-red-600 font-medium" : ""
                          }`}
                        >
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-300 cursor-pointer relative group"
                            aria-label="Edit item"
                          >
                            <FiEdit2 className="w-5 h-5" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Edit item
                            </span>
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-300 cursor-pointer relative group"
                            aria-label="Delete item"
                          >
                            <FiTrash2 className="w-5 h-5" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Delete item
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingItem) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const itemData = {
                  name: formData.get("name") as string,
                  category: formData.get("category") as string,
                  quantity: Number(formData.get("quantity")),
                  price: Number(formData.get("price")),
                };

                if (editingItem) {
                  handleUpdateItem({
                    ...itemData,
                    id: editingItem.id,
                    lastUpdated: editingItem.lastUpdated,
                  });
                } else {
                  handleAddItem(itemData);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingItem?.name}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
                           focus:ring-blue-500 focus:border-blue-500"
                  autoFocus={isAddModalOpen}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={editingItem?.category}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
                           focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={editingItem?.quantity}
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
                           focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingItem?.price}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
                           focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-10 py-2 border border-gray-300 rounded-md text-gray-700
                           hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 text-white rounded-md
                           hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                >
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
