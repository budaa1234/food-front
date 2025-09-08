"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserType = {
  userId: string;
  email: string;
  role: string;
  _id: string
};

type UserContextType = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  setUser: () => {},
});

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:4200/user/get-current-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data: UserType = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
