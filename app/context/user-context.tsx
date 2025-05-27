"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UserData = {
    nim: string;
    full_name: string;
    classes: string[];
    setUser: (data: Omit<UserData, "setUser">) => void;
};

const UserContext = createContext<UserData | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<Omit<UserData, "setUser">>({
        nim: "",
        full_name: "",
        classes: [],
    });

    const setUser = (data: Omit<UserData, "setUser">) => {
        setUserState(data);
    };

    return (
        <UserContext.Provider value={{ ...user, setUser }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};
