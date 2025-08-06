"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserType = {
  userId: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: UserType;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTQ0NDEwMjYsImRhdGEiOnsidXNlcklkIjoiNjg5Mjk3MTcxMmU0M2VlZTc0MzAyNDVlIiwicm9sZSI6IlVTRVIiLCJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIn0sImlhdCI6MTc1NDQzNzQyNn0.YGMfvl4BmtHMPMz1fbdPmfDIMviT_xRl3-YEsY924cs";
    const getCurrentUser = async () => {
      const userData = await getCurrentUserByAccessToken(accessToken);
      console.log("userData", userData);
      setUser(userData);
    };
    getCurrentUser();
  }, []);

  const getCurrentUserByAccessToken = async (accessToken: string) => {
    try {
      const response = await fetch(
        "http://localhost:4200/user/get-current-user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);