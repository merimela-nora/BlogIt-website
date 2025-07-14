import { useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  [key: string]: any; 
}

function safeParseUser(raw: string | null): User | null {
  if (!raw || raw === "undefined") return null;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "firstName" in parsed) {
      return parsed as User;
    }
    return null;
  } catch (err) {
    console.error("Could not parse stored user:", err);
    return null;
  }
}

export default function useUser(): User | null {
  const [user, setUser] = useState<User | null>(() => {
    return safeParseUser(localStorage.getItem("user"));
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(safeParseUser(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return user;
}
