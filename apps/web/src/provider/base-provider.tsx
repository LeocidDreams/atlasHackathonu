import { createContext, useContext } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";

type BaseProviderProps = {
  children: React.ReactNode;
};

type BaseProviderState = Record<string, never>;

const initialState: BaseProviderState = {};

const BaseProviderContext = createContext<BaseProviderState>(initialState);

export function BaseProvider({ children, ...props }: BaseProviderProps) {
  const value: BaseProviderState = {};

  return (
    <ThemeProvider>
      <AuthProvider>
        <BaseProviderContext.Provider {...props} value={value}>
          {children}
        </BaseProviderContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
