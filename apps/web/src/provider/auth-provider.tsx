import { createContext, useContext } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = Record<string, never>;

const initialState: AuthProviderState = {};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const value: AuthProviderState = {};

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
