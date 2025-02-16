import { motion } from "motion/react";
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";

export interface SidebarProps {
  children: ReactNode;
  initialOpen?: boolean;
  animate?: boolean;
}

export interface SidebarBodyProps extends ComponentProps<typeof motion.div> {}

export interface SidebarContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  animate: boolean;
}

export interface SidebarLinkProps {
  label: string;
  redirectTo: string;
  icon: ReactNode;
}
