const STORAGE_KEY = "inventory_items";

const initialItems: InventoryItem[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    quantity: 15,
    price: 999.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Desk Chair",
    category: "Furniture",
    quantity: 8,
    price: 199.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Coffee Maker",
    category: "Appliances",
    quantity: 12,
    price: 79.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Monitor",
    category: "Electronics",
    quantity: 5,
    price: 299.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Desk",
    category: "Furniture",
    quantity: 20,
    price: 249.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Keyboard",
    category: "Electronics",
    quantity: 25,
    price: 89.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Mouse",
    category: "Electronics",
    quantity: 30,
    price: 49.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Headphones",
    category: "Electronics",
    quantity: 18,
    price: 159.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Bookshelf",
    category: "Furniture",
    quantity: 7,
    price: 179.99,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Microwave",
    category: "Appliances",
    quantity: 10,
    price: 129.99,
    lastUpdated: new Date().toISOString(),
  },
];

const categories = [
  "Electronics",
  "Furniture",
  "Appliances",
  "Books",
  "Clothing",
  "Home Decor",
  "Kitchenware",
  "Office Supplies",
];

export const getStoredInventory = (): InventoryItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
    return initialItems;
  }
  return JSON.parse(stored);
};

export const updateInventory = (items: InventoryItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addItem = (
  item: Omit<InventoryItem, "id" | "lastUpdated">
): InventoryItem => {
  const newItem: InventoryItem = {
    ...item,
    id: crypto.randomUUID(),
    lastUpdated: new Date().toISOString(),
  };
  const items = getStoredInventory();
  updateInventory([...items, newItem]);
  return newItem;
};

export const updateItem = (item: InventoryItem): void => {
  const items = getStoredInventory();
  const updatedItems = items.map((i) =>
    i.id === item.id ? { ...item, lastUpdated: new Date().toISOString() } : i
  );
  updateInventory(updatedItems);
};

export const deleteItem = (id: string): void => {
  const items = getStoredInventory();
  updateInventory(items.filter((item) => item.id !== id));
};

export const getCategories = (): string[] => {
  return categories;
};
