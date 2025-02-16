export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export interface AnimatedTabsProps {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export interface FadeInDivProps {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}
