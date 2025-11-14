"use client";

import React, { createContext, useContext, useState } from "react";

type NavbarContextType = {
  isPowered: boolean;
  setIsPowered: (value: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isPowered, setIsPowered] = useState(true);

  return (
    <NavbarContext.Provider value={{ isPowered, setIsPowered }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
