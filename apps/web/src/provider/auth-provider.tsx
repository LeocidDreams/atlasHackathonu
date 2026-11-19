import { createContext, useContext, useState } from "react";
import type { User } from "@atlas/domain";
import { supabase } from "@lib/supabase";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  user: User | null;
  isLoggedIn: boolean;
};

const initialState: AuthProviderState = {
  user: null,
  isLoggedIn: false,
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value: AuthProviderState = {
    user,
    isLoggedIn,
  };

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
    if (event === "INITIAL_SESSION") {
      if (session?.user) {
        setUser({
          createdAt: session.user.created_at,
          email: session.user.email ?? "",
          id: session.user.id,
          updatedAt: session.user.updated_at ?? "",
        });
        setIsLoggedIn(true);
      }
    } else if (event === "SIGNED_IN") {
      if (session?.user) {
        setUser({
          createdAt: session.user.created_at,
          email: session.user.email ?? "",
          id: session.user.id,
          updatedAt: session.user.updated_at ?? "",
        });
        setIsLoggedIn(true);
      }
    } else if (event === "SIGNED_OUT") {
      setUser(null);
      setIsLoggedIn(false);
    } else if (event === "PASSWORD_RECOVERY") {
      if (session?.user) {
        setUser({
          createdAt: session.user.created_at,
          email: session.user.email ?? "",
          id: session.user.id,
          updatedAt: session.user.updated_at ?? "",
        });
        setIsLoggedIn(true);
      }
    } else if (event === "TOKEN_REFRESHED") {
      if (session?.user) {
        setUser({
          createdAt: session.user.created_at,
          email: session.user.email ?? "",
          id: session.user.id,
          updatedAt: session.user.updated_at ?? "",
        });
        setIsLoggedIn(true);
      }
    } else if (event === "USER_UPDATED") {
      if (session?.user) {
        setUser({
          createdAt: session.user.created_at,
          email: session.user.email ?? "",
          id: session.user.id,
          updatedAt: session.user.updated_at ?? "",
        });
        setIsLoggedIn(true);
      }
    }
  });

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
