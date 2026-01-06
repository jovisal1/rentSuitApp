import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Role, User } from "../types/User";

type UserState = {
    user: User | null;
    role: Role | null;

    setUser: (user: User | null, role: Role | null) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserState>()(
    (set) => ({
        user: null,
        role: null,

        setUser: (user, role) =>
            set({
                user,
                role,
            }),

        clearUser: () =>
            set({
                user: null,
                role: null,
            }),
    })
);