"use client"

import { createContext, useContext, useState } from "react"
import { SidebarContextProps } from "../../types/SidebarTypes"

const SidebarCtx = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarCtx)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarContext = ({ children, initialOpen = false, animate = true }: {
    children: React.ReactNode
    initialOpen?: boolean
    animate?: boolean
  }) => {
  const [open, setOpen] = useState(initialOpen)

  return <SidebarCtx.Provider value={{ open, setOpen, animate }}>{children}</SidebarCtx.Provider>
}

