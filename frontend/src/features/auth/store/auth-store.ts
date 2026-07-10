import { create } from "zustand";

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
};

type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
    },
}));