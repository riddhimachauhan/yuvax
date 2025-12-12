import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem: async (_key: string): Promise<string | null> => {
      return null;
    },
    setItem: async (_key: string, value: string): Promise<string> => {
      return value;
    },
    removeItem: async (_key: string): Promise<void> => {
      return;
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
