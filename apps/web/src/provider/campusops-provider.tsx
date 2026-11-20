import { createContext, useContext, useState } from "react";
import React from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
}

type CampusOpsProviderProps = {
  children: React.ReactNode;
};

type CampusOpsProviderState = {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  draft: string;
  setDraft: React.Dispatch<React.SetStateAction<string>>;
};

const initialState: CampusOpsProviderState = {
  chatMessages: [],
  setChatMessages: () => {},
  draft: "",
  setDraft: () => {},
};

const CampusOpsProviderContext =
  createContext<CampusOpsProviderState>(initialState);

export function CampusOpsProvider({
  children,
  ...props
}: CampusOpsProviderProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [draft, setDraft] = useState("");

  const value: CampusOpsProviderState = {
    chatMessages,
    setChatMessages,
    draft,
    setDraft,
  };

  return (
    <CampusOpsProviderContext.Provider {...props} value={value}>
      {children}
    </CampusOpsProviderContext.Provider>
  );
}

export const useCampusOps = () => {
  const context = useContext(CampusOpsProviderContext);

  if (context === undefined)
    throw new Error("useCampusOps must be used within a CampusOpsProvider");

  return context;
};
