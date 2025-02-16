"use client"

import { DesktopSidebar } from "@components/sidebar/SidebarDesktop"
import { MobileSidebar } from "@components/sidebar/SidebarMobile"
import { SidebarBodyProps } from "../../types/SidebarTypes"
import { ComponentProps } from "react"

export const SidebarBody = (props: SidebarBodyProps) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as ComponentProps<"div">)} />
    </>
  )
}

