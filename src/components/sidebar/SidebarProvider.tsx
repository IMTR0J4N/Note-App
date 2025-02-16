"use client"

import { SidebarContext } from "./SidebarContext"
import { SidebarProps } from "../../types/SidebarTypes"

export const SidebarProvider = ({ children, initialOpen, animate }: SidebarProps) => {
  return (
    <SidebarContext initialOpen={initialOpen} animate={animate}>
      {children}
    </SidebarContext>
  )
}