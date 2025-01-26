interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: string;
}

type SortOrder = "asc" | "desc";
type SortField = "name" | "quantity" | "price" | "category";

interface InventoryFilters {
  category: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  search: string;
}
