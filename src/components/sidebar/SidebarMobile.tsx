"use client"

import type React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useSidebar } from "./SidebarContext"
import { HiMenu, HiX } from "react-icons/hi"

interface MobileSidebarProps extends React.ComponentProps<"div"> {}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={`h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full`}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <HiMenu className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={`fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between ${className}`}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <HiX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

