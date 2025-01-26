import { useState, useEffect } from "react";
import {
  getStoredInventory,
  updateItem,
  deleteItem,
  addItem,
  getCategories,
} from "./utils/inventoryUtils";
import Header from "./components/Header";
import InventoryFilters from "./components/InventoryFilters";
import InventoryTable from "./components/InventoryTable";
import InventoryModal from "./components/InventoryModal";
import ConfirmDialog from "./components/ConfirmDialog";

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
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    itemId: string | null;
  }>({ isOpen: false, itemId: null });

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
    setDeleteConfirmation({ isOpen: true, itemId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.itemId) {
      deleteItem(deleteConfirmation.itemId);
      setItems((prev) =>
        prev.filter((item) => item.id !== deleteConfirmation.itemId)
      );
      setDeleteConfirmation({ isOpen: false, itemId: null });
    }
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

  const handleModalSubmit = (formData: FormData) => {
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
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Header onAddClick={() => setIsAddModalOpen(true)} />

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <InventoryFilters
            filters={filters}
            categories={categories}
            onFilterChange={setFilters}
          />
          <InventoryTable
            items={filteredItems}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>

      <InventoryModal
        isOpen={isAddModalOpen || editingItem !== null}
        editingItem={editingItem}
        categories={categories}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      <ConfirmDialog
        isOpen={deleteConfirmation.isOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmation({ isOpen: false, itemId: null })}
      />
    </div>
  );
};

export default App;
