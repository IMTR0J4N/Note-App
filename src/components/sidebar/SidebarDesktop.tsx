"use client"

import { motion } from "motion/react"
import { useSidebar } from "@components/sidebar/SidebarContext"
import { SidebarBodyProps } from "../../types/SidebarTypes"

export const DesktopSidebar=  ({ className, children, ...props }: SidebarBodyProps) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <motion.div
      className={`h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0 ${className}`}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

