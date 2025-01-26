import { FiPlus } from "react-icons/fi";

interface HeaderProps {
  onAddClick: () => void;
}

const Header = ({ onAddClick }: HeaderProps) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
    <button
      onClick={onAddClick}
      className="bg-blue-500 hover:bg-blue-600 active:scale-90 text-white px-4 py-2 rounded-lg
                transition-all duration-300 ease-in-out cursor-pointer flex items-center gap-2"
    >
      <FiPlus className="w-5 h-5" />
      Add Item
    </button>
  </div>
);

export default Header;
