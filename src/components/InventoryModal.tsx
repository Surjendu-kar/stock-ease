interface InventoryModalProps {
  isOpen: boolean;
  editingItem: InventoryItem | null;
  categories: string[];
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const InventoryModal = ({
  isOpen,
  editingItem,
  categories,
  onClose,
  onSubmit,
}: InventoryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              title="Name"
              type="text"
              name="name"
              defaultValue={editingItem?.name}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2
                       focus:ring-blue-500 focus:border-blue-500"
              autoFocus={!editingItem}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              title="Category"
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
              title="Quantity"
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
              title="Price"
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
              onClick={onClose}
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
  );
};

export default InventoryModal;
