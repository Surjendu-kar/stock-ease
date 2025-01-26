import dayjs from "dayjs";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const InventoryTable = ({ items, onEdit, onDelete }: InventoryTableProps) => (
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
            Last Updated
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
              No items found
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr
              key={item.id}
              className={`hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
                item.quantity < 10 ? "bg-red-50" : ""
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
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
                {item.lastUpdated
                  ? dayjs(item.lastUpdated).format("MM/DD/YYYY hh:mm A")
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-300 cursor-pointer relative group"
                    aria-label="Edit item"
                  >
                    <FiEdit2 className="w-5 h-5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Edit item
                    </span>
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
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
);

export default InventoryTable;
