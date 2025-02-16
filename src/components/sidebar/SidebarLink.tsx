"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { useSidebar } from "@components/sidebar/SidebarContext"
import { SidebarLinkProps } from "../../types/SidebarTypes"

export const SidebarLink = ({ label, redirectTo, icon }: SidebarLinkProps) => {
  const { open, animate } = useSidebar()
  return (
    <Link
      href={redirectTo}
      className={`flex items-center justify-start gap-2 group/sidebar py-2 text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
    >
      {icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-md group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {label}
      </motion.span>
    </Link>
  )
}

