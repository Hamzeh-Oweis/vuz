import { create } from "zustand";
import { fetchUsers } from "@/utils/api";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    },
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

interface UserStore {
    users: User[];
    cache: Record<string, User[]>;
    filteredUsers: User[];
    setFilteredUsers: (users: User[]) => void;
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    users: [],
    cache: {},
    filteredUsers: [],
    setFilteredUsers: (items) => set({ filteredUsers: items }),
    loading: false,
    error: null,

    fetchUsers: async () => {
        const { cache } = get();

        if (cache["users"]) {
            console.log("Using Cached Data");
            set({ users: cache["users"] });
            return;
        }

        set({ loading: true, error: null });

        try {
            const users = await fetchUsers();
            set({ users, filteredUsers: users, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch users", loading: false });
            console.error("Failed to fetch users:", error);
        }
    },
}));
