import { createContext, useContext } from "react";
import { ThemeProvider } from "@provider/theme-provider";
import { AuthProvider } from "@provider/auth-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@lib/query-client";
import { CampusOpsProvider } from "@provider/campusops-provider";

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CampusOpsProvider>
            <BaseProviderContext.Provider {...props} value={value}>
              {children}
            </BaseProviderContext.Provider>
          </CampusOpsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export const useBase = () => {
  const context = useContext(BaseProviderContext);

  if (context === undefined)
    throw new Error("useBase must be used within a BaseProvider");

  return context;
};
